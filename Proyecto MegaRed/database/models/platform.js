module.exports = (sequelize, dataTypes) => {
    let alias = "Platform";
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
        tableName:"platform",
        timestamps: false
    };

    Platform.associate = function(models){
        Platform.belongsToMany(models.Products, {
            as: "products",
            through: "platform_product",
            foreingKey: "platform_id",
            otherKey: "product_id",
            timestamps: false
        })
    }
}