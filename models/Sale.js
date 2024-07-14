const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Sale = sequelize.define('Sale', {
  productId: { type: DataTypes.INTEGER, allowNull: false },
  customerId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Sale;
