const express = require('express')
const router = express.Router()

const {
  createFranchise,
  getAllFranchises,
  getFranchiseById,
  updateFranchise,
  deleteFranchise,
  addUserToFranchise
} = require('../controllers/franchiseController')

const verifyToken = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/roleMiddleware')

// 👑 Solo superadmin puede crear
router.post(
  '/',
  verifyToken,
  checkRole('superadmin'),
  createFranchise
)

// 👑 Solo superadmin puede ver todas
router.get(
  '/',
  verifyToken,
  checkRole('superadmin'),
  getAllFranchises
)

// 👑 Solo superadmin puede ver una
router.get(
  '/:id',
  verifyToken,
  checkRole('superadmin'),
  getFranchiseById
)

// 👑 Solo superadmin puede actualizar
router.put(
  '/:id',
  verifyToken,
  checkRole('superadmin'),
  updateFranchise
)

// 👑 Solo superadmin puede eliminar
router.delete(
  '/:id',
  verifyToken,
  checkRole('superadmin'),
  deleteFranchise
)

router.post('/users', addUserToFranchise)

module.exports = router