'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Tabla de usuarios
    return queryInterface.createTable('users', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type : Sequelize.INTEGER },
      name: {type : Sequelize.STRING(50), allowNull: false},
      password : {type : Sequelize.STRING(200),allowNull: false},
      admin : {type : Sequelize.BOOLEAN,defaultValue: false,allowNull: false},
      email : {type : Sequelize.STRING(50),allowNull: false,unique : true},
      avatar : {type : Sequelize.STRING(300),allowNull: false}
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('users');
     
  }
};
