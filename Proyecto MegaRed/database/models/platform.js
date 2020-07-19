module.exports = (sequelize, dataType) => {
    let alias = "Platform";
    let cols = {
        id : {
            type: dataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name : {
            type: dataType.STRING(50),
            allowNull: false
        }

    };
    
    let config = {
        tableName:"platform",
        timestamps: false
    };
    const Platform = sequelize.define(alias, cols, config)
    
    Platform.associate = function(models) {
        Platform.hasMany(models.Products, {
            as: "product",
            foreignKey: "platformId"
        });
    }
    
    return Platform;
    
    
}