const { Product } = require("../models")

// Crear producto
const createProduct = async (req, res) => {
  try {

    const { name, description, price, stock } = req.body

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      franchise_id: req.franchiseId
    })

    res.json(product)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Obtener productos
const getProducts = async (req, res) => {
  try {

    const products = await Product.findAll({
      where: { franchise_id: req.franchiseId }
    })

    res.json(products)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Actualizar producto
const updateProduct = async (req, res) => {
  try {

    const { id } = req.params

    const product = await Product.findOne({
      where: {
        id,
        franchise_id: req.franchiseId
      }
    })

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    await product.update(req.body)

    res.json(product)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Eliminar producto
const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params

    const product = await Product.findOne({
      where: {
        id,
        franchise_id: req.franchiseId
      }
    })

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    await product.destroy()

    res.json({ message: "Producto eliminado" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
}