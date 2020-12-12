const models =require('../models');
const config = require('../secret/config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = async(req,res, next)=>{
    models.user.findOne({
        where: 
        {
            email: req.body.email
        }
    }).then(user => {
        if (!user) 
        {
         return res.status(404).send('User Not Found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if (!passwordIsValid) 
        {
            return res.status(401).send({ 
                auth: false, 
                accessToken: null,
                reason: "Invalid Password!" });
        }
        var token = jwt.sign({
            id: user.id, 
            name: user.name, 
            email: user.email 
        }, config.secret, 
        {
        expiresIn: 86400 // expires in 24 hours
    });
        res.status(200).send({ 
            auth: true, 
            accessToken: token,
            user: user 
        });
    }).catch(err => {
        res.status(500).send('Error -> ');
        next(err);
    }); 
}
exports.register = async(req,res, next)=>{
    try{
        req.body.password = bcrypt.hashSync(req.body.password,10);
        const user = await models.user.create(req.body);
        res.status(200).json(user);

    } catch(error){
        res.status(500).send('Error ->');
        next(error);
    }

}
exports.listar = async(req,res, next)=>{
    try{
        const user = await models.user.findAll();
        res.status(200).json(user);
    } catch(error){
        res.status(500).send('Error ->');
        next(error);
    }

}