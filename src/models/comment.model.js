module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Comment", {
        idManga: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        idUser: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

};


