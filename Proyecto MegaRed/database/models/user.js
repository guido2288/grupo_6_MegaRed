

module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50)
        },
        email: {
            type: dataTypes.STRING(50)
        },
        password: {
            type: dataTypes.STRING(150)
        },
        avatar: {
            type: dataTypes.STRING(300)
        },
        type_id: {
            type: dataTypes.BOOLEAN
        }

    };
    let config = {
        tableName:"users",
        timestamps: false
    };

    
    
}