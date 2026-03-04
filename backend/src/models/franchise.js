const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Franchise = sequelize.define('Franchise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Franchise