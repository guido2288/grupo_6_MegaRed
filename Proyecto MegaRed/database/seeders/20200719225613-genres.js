'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert("genres", [
      {name: "Acción"}, 
      {name: "Aventura"},
      {name: "Casual"},
      {name: "Carreras"},
      {name: "Deportes"},
      {name: "Estrategia"},
      {name: "Rol"},
      {name: "Simulación"}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
     return queryInterface.bulkDelete('genres', null, {});
     
  }
};
