const { 
  Order, 
  OrderItem, 
  Product, 
  User, 
  Franchise, 
  sequelize 
} = require("../models")

const createOrder = async (req, res) => {

  const t = await sequelize.transaction()

  try {

    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "items debe ser un arreglo"
      })
    }

    let total = 0

    const order = await Order.create(
      {
        franchise_id: req.franchiseId,
        user_id: req.user.id
      },
      { transaction: t }
    )

    for (const item of items) {

      const product = await Product.findByPk(item.product_id, {
        transaction: t
      })

      if (!product) {
        throw new Error("Producto no encontrado")
      }

      if (product.stock < item.quantity) {
        throw new Error("Stock insuficiente")
      }

      const subtotal = product.price * item.quantity
      total += subtotal

      await OrderItem.create(
        {
          order_id: order.id,
          product_id: product.id,
          quantity: item.quantity,
          price: product.price
        },
        { transaction: t }
      )

      product.stock -= item.quantity
      await product.save({ transaction: t })

    }

    order.total = total
    await order.save({ transaction: t })

    await t.commit()

    res.status(201).json(order)

  } catch (error) {

    await t.rollback()

    res.status(500).json({
      message: error.message
    })
  }
}

const getInvoice = async (req, res) => {
  try {

    const { id } = req.params

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Franchise,
          attributes: ["id", "nombre"]
        },
        {
          model: User,
          attributes: ["id", "nombre", "email"]
        },
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"]
            }
          ]
        }
      ]
    })

    if (!order) {
      return res.status(404).json({
        message: "Orden no encontrada"
      })
    }

    res.json(order)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

module.exports = {
  createOrder,
  getInvoice
}
