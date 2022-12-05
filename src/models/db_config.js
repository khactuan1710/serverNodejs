const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
    port:process.env.MYSQLPORT
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.book = require("./books.model")(sequelize, Sequelize);
db.customer = require("./customer.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.image = require("./image.model")(sequelize, Sequelize);


module.exports = db;
