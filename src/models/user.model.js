const { DataTypes } = require('sequelize');
const db = require('../db/database');

const Users = db.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'disabled'),
      allowNull: false
    },
  },
  {
    freezeTableName: true,
  }
  
);

module.exports = Users;