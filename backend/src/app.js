const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')

require('./models') // Importar modelos primero

const app = express() // ✅ Crear app primero

// Middlewares globales
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/userRoutes'))

const franchiseRoutes = require('./routes/franchiseRoutes')
app.use('/api/franchises', franchiseRoutes)

// Sincronizar base de datos
sequelize.sync({ alter: true })
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error(err))

module.exports = app