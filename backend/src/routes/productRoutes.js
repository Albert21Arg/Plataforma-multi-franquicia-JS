const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/verifyToken")
const franchiseMiddleware = require("../middlewares/franchiseMiddleware")

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController")

router.post(
  "/",
  verifyToken,
  franchiseMiddleware,
  createProduct
)

router.get(
  "/",
  verifyToken,
  franchiseMiddleware,
  getProducts
)

router.put(
  "/:id",
  verifyToken,
  franchiseMiddleware,
  updateProduct
)

router.delete(
  "/:id",
  verifyToken,
  franchiseMiddleware,
  deleteProduct
)

module.exports = router