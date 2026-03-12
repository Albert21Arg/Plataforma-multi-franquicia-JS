const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')

const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")

require('./models') // carga los modelos y relaciones

const app = express()

// Middlewares globales
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

const franchiseRoutes = require('./routes/franchiseRoutes')
app.use('/api/franchises', franchiseRoutes)


// Sincronizar base de datos
sequelize.sync({ alter: true })
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error(err))

module.exports = app