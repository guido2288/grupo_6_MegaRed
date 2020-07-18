'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type : Sequelize.INTEGER } ,
      name: {type : Sequelize.STRING(50), allowNull: false},
      descripcion: {type : Sequelize.STRING(500), allowNull: false},
      precio: {type : Sequelize.INTEGER, allowNull: false},
      stock : {type : Sequelize.INTEGER, allowNull: false},
      img : {type : Sequelize.STRING(500), allowNull: false},
      genreId : {type: Sequelize.INTEGER,allowNull: false},
      platformId : {type: Sequelize.INTEGER,allowNull: false}      
    });
    
  },

  down: async (queryInterface, Sequelize) => {   
  return queryInterface.dropTable('products');

  }
};


 
