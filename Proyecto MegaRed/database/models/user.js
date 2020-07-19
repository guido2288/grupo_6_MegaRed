

module.exports = (sequelize, dataType) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowallowNull: false
        },
        name: {
            type: dataType.STRING(50),
            allowNull: false
        },
        email: {
            type: dataType.STRING(50),
            allowNull: false
        },
        password: {
            type: dataType.STRING(150),
            allowNull: false
        },
        avatar: {
            type: dataType.STRING(300),
            allowNull: false
        },
        admin: {
            type: dataType.INTEGER(11),
            defaultValue: 0,
            allowNull: false
        }

    };
    let config = {
        tableName:"users",
        timestamps: false
    };

    const Users = sequelize.define(alias, cols, config);

    return Users;

    
    
}