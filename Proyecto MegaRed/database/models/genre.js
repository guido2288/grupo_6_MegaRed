const { sequelize } = require(".");
const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("Genre", {
        name : {
            type : DataTypes.STRING(45)
        }
    }, {
        tebleName: "genres" ,
        timestamps : false
    })

    return Model
}