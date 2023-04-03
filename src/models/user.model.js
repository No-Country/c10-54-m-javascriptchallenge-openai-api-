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
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
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
      allowNull: true
    },
  },
  {
    freezeTableName: true,
  }
  
);

module.exports = Users;