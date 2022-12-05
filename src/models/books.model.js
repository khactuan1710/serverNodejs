module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Books", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        publishingYear: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        coverImage: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
};
