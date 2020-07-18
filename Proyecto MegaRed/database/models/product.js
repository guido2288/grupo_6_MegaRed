
module.exports = (sequelize, dataType) => {
    let alias = "Products" ;
    let col = {
        id : {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: dataTypes.STRING(50)
        },
        descripcion : {
            type: dataTypes.STRING(500)
        },
        precio : {
            type: dataTypes.INTEGER(11)
        },
        stock : {
            type: dataTypes.INTEGER(11)
        },
        img : {
            type: dataTypes.STRING(500)
        }
        
    };
    let config = {
        tableName:"products",
        timestamps: false
    };
    

    Products.associate = function(models){
        Products.belongsTo(models.Genres, {
            as: "genre",
            foreingKey : "genre_Id"
        })
        
        Products.belongsToMany(models.Platform, {
        as: "platform",
        through: "platform_product",
        foreingKey: "product_id",
        otherKey: "platform_id",
        timestamps: false
        })
        

    }

    



}