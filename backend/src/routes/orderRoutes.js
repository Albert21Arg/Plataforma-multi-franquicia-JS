const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/verifyToken")
const franchiseMiddleware = require("../middlewares/franchiseMiddleware")

const { createOrder, getInvoice } = require("../controllers/orderController")

// Crear orden
router.post(
  "/",
  verifyToken,
  franchiseMiddleware,
  createOrder
)

// Obtener factura de una orden
router.get(
  "/:id/invoice",
  verifyToken,
  franchiseMiddleware,
  getInvoice
)

module.exports = router