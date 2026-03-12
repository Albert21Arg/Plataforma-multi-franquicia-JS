const sequelize = require('../config/database')
const { DataTypes } = require('sequelize')

const User = require('./user')
const Franchise = require('./franchise')
const Product = require('./product')


// MODELOS QUE SON FUNCIONES
const FranchiseUserModel = require('./franchiseUser')
const OrderModel = require('./order')
const OrderItemModel = require('./orderItem')

// INICIALIZAR MODELOS
const FranchiseUser = FranchiseUserModel(sequelize, DataTypes)
const Order = OrderModel(sequelize, DataTypes)
const OrderItem = OrderItemModel(sequelize, DataTypes)


// RELACIÓN MUCHOS A MUCHOS

User.belongsToMany(Franchise, {
  through: FranchiseUser,
  foreignKey: "user_id"
})

Franchise.belongsToMany(User, {
  through: FranchiseUser,
  foreignKey: "franchise_id"
})


// Franquicia -> Productos

Franchise.hasMany(Product, {
  foreignKey: "franchise_id"
})

Product.belongsTo(Franchise, {
  foreignKey: "franchise_id"
})


// Orders

Order.hasMany(OrderItem, {
  foreignKey: "order_id"
})

OrderItem.belongsTo(Order, {
  foreignKey: "order_id"
})


// Productos en OrderItems

Product.hasMany(OrderItem, {
  foreignKey: "product_id"
})

OrderItem.belongsTo(Product, {
  foreignKey: "product_id"
})


module.exports = {
  sequelize,
  User,
  Franchise,
  FranchiseUser,
  Product,
  Order,
  OrderItem
}