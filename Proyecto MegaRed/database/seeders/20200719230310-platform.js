'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert("platform", [
      {name: "Playstation 4" },
      {name: "Xbox One"},
      {name: "Nintendo Switch"}
    ])
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('platform', null, {});
     
  }
};
