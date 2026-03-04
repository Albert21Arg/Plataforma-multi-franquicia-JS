const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')

require('./models') // Importar modelos primero

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))

sequelize.sync({ alter: true })
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error(err))

module.exports = app