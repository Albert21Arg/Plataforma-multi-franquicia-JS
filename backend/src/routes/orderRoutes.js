const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/verifyToken")
const franchiseMiddleware = require("../middlewares/franchiseMiddleware")

const { createOrder } = require("../controllers/orderController")

router.post(
  "/",
  verifyToken,
  franchiseMiddleware,
  createOrder
)

module.exports = router