'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('platform_product', {
      id: {allowNull: false, autoIncrement: true,primaryKey: true,type: Sequelize.INTEGER},
      platform_Id : {type:Sequelize.INTEGER, allowNull:false},
      product_Id : {type:Sequelize.INTEGER,  allowNull:false}
      

    });
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('platform_product');
    
  }
};
