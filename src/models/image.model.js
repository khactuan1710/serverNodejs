module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Image", {
        idManga: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        chapter: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        page: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        img: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
};


