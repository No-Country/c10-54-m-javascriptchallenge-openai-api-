const { DataTypes } = require('sequelize');
const db = require('../db/database');

const orderUsers = db.define('orderUsers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = orderUsers;