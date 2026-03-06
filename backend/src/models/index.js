const sequelize = require('../config/database')
const { DataTypes } = require('sequelize')

const User = require('./User')
const Franchise = require('./franchise')
const FranchiseUserModel = require('./FranchiseUser')

const Product = require("./product")

// Crear el modelo pivote
const FranchiseUser = FranchiseUserModel(sequelize, DataTypes)


// RELACIÓN MUCHOS A MUCHOS

User.belongsToMany(Franchise, {
  through: FranchiseUser,
  foreignKey: "user_id"
})

Franchise.belongsToMany(User, {
  through: FranchiseUser,
  foreignKey: "franchise_id"
})

Franchise.hasMany(Product, {
  foreignKey: "franchise_id"
})

Product.belongsTo(Franchise, {
  foreignKey: "franchise_id"
})


module.exports = {
  sequelize,
  User,
  Franchise,
  FranchiseUser,
  Product
}