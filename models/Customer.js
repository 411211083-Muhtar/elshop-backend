const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Customer = sequelize.define('Customer', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Customer;
