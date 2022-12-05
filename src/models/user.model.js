module.exports = (sequelize, Sequelize) => {
    return sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        keyApi: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
};


