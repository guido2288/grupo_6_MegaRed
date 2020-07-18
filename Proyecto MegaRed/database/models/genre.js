
module.exports = (sequelize, dataTypes) => {
    let alias = "Genres";
    let col = {
        id : {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: dataTypes.STRING(50)
        }

    };
    let config = {
        tableName:"genres",
        timestamps: false
    };
    Genres.associate = function(models){
        Genres.hasMany(models.Products, {
            as: "product",
            foreingKey : "product_Id"
        })
    }
    

    

}