const { Franchise, FranchiseUser  } = require('../models')

// ✅ Crear franquicia
const createFranchise = async (req, res) => {
  try {
    const { nombre } = req.body

    const franchise = await Franchise.create({ nombre })

    res.status(201).json(franchise)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear franquicia', error })
  }
}

// ✅ Obtener todas las franquicias
const getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.findAll()
    res.json(franchises)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener franquicias', error })
  }
}

// ✅ Obtener una franquicia por ID
const getFranchiseById = async (req, res) => {
  try {
    const { id } = req.params

    const franchise = await Franchise.findByPk(id)

    if (!franchise) {
      return res.status(404).json({ message: 'Franquicia no encontrada' })
    }

    res.json(franchise)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener franquicia', error })
  }
}

// ✅ Actualizar franquicia
const updateFranchise = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre } = req.body

    const franchise = await Franchise.findByPk(id)

    if (!franchise) {
      return res.status(404).json({ message: 'Franquicia no encontrada' })
    }

    franchise.nombre = nombre
    await franchise.save()

    res.json(franchise)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar franquicia', error })
  }
}

// ✅ Eliminar franquicia
const deleteFranchise = async (req, res) => {
  try {
    const { id } = req.params

    const franchise = await Franchise.findByPk(id)

    if (!franchise) {
      return res.status(404).json({ message: 'Franquicia no encontrada' })
    }

    await franchise.destroy()

    res.json({ message: 'Franquicia eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar franquicia', error })
  }
}

// agregar usuario a franquicia
const addUserToFranchise = async (req, res) => {
  try {

    const { user_id, franchise_id, role } = req.body

    const relation = await FranchiseUser.create({
      user_id,
      franchise_id,
      role
    })

    res.status(201).json(relation)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createFranchise,
  getAllFranchises,
  getFranchiseById,
  addUserToFranchise,
  updateFranchise,
  deleteFranchise
}