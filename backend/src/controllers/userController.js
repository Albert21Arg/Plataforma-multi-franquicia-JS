const bcrypt = require('bcryptjs')
const { User, Franchise } = require('../models')

// 👑 Crear admin asignado a franquicia
const createAdmin = async (req, res) => {
  try {
    const { nombre, email, password, franchiseId } = req.body

    // Verificar que la franquicia exista
    const franchise = await Franchise.findByPk(franchiseId)
    if (!franchise) {
      return res.status(404).json({ message: 'Franquicia no encontrada' })
    }

    // Verificar que no exista el email
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol: 'admin',
      franchiseId
    })

    res.status(201).json({
      message: 'Admin creado correctamente',
      user
    })

  } catch (error) {
    res.status(500).json({ message: 'Error creando admin', error })
  }
}

const createClient = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // 🔐 Tomamos la franquicia del token
    const franchiseId = req.user.franchiseId

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email ya registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol: 'cliente',
      franchiseId // 🔥 Automático
    })

    res.status(201).json({
      message: 'Cliente creado correctamente',
      user
    })

  } catch (error) {
    res.status(500).json({ message: 'Error creando cliente', error })
  }
}

module.exports = {
  createAdmin,
  createClient
  }

