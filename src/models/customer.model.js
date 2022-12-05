module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("Customer", {
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
  });
    return Customer;
  };
  
  
  