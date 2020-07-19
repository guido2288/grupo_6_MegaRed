
module.exports = (sequelize, dataType) => {
    let alias = "Products" ;
    let cols = {
        id : {
            type: dataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: dataType.STRING(50),
            allowNull: false
        },
        descripcion : {
            type: dataType.STRING(500),
            allowNull: false
        },
        precio : {
            type: dataType.INTEGER(11),
            allowNull: false
        },
        stock : {
            type: dataType.INTEGER(11),
            allowNull: false
        },
        img : {
            type: dataType.STRING(500),
            allowNull: false
        }
        
    };
    let config = {
        tableName:"products",
        timestamps: false
    };
    
    const Products = sequelize.define(alias, cols, config)
    
    Products.associate = function(models) {
        Products.belongsTo(models.Genres, {
            as: "genre",
            foreignKey: "genreId"
        });
    } 
    

    
    Products.associate = function(models) {
        Products.belongsTo(models.Platform, {
            as: "platform",
            foreignKey: "platformId"
        });
    } 
    
    
    return Products;



};