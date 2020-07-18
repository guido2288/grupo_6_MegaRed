module.exports = (sequelize, dataTypes) => {
    let alias = "Platform_products";
    let col = {
        id : {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        platform_id : {
            type: dataTypes.INTEGER(11),
            autoIncrement: true
        },
        product_id : {
            type: dataTypes.INTEGER(11),
            autoIncrement: true
        }

    };
    let config = {
        tableName:"platform_products",
        timestamps: false
    };
}