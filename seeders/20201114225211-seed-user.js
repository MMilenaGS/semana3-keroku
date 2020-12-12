'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            name: 'carlos',
            email: 'ejemplo@gmail.com',
            password: '$2y$10$EjpkNkHbgmW9v1Slse3fVeVsrvWP6upcWa8fXPHyFn3OW28oWDWMW',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    
    ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});

    }
};