const router=require('express').Router();

const UserController = require('../../controllers/UserController.js');


// api/auth/login
router.post('/signin',UserController.signin);
// api/auth/register
router.post('/register',UserController.register);
//  api/auth/
router.get('/',UserController.listar); 



module.exports=router;