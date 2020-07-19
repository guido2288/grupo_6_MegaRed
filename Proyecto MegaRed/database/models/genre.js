
module.exports = (sequelize, dataType) => {
    let alias = "Genres";
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
        tableName:"genres",
        timestamps: false
    };

    const Genre = sequelize.define(alias, cols, config)
    
    Genre.associate = function(models) {
        Genre.hasMany(models.Products, {
            as: "product",
            foreignKey: "genreId"
        });
    }
    
    return Genre;
    

}