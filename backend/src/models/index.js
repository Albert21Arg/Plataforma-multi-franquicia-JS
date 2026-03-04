const User = require('./User')
const Franchise = require('./franchise')

// Relaciones
Franchise.hasMany(User, { foreignKey: 'franchiseId' })
User.belongsTo(Franchise, { foreignKey: 'franchiseId' })

module.exports = {
  User,
  Franchise
}