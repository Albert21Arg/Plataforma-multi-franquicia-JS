const express = require('express')
const router = express.Router()

const { createAdmin, createClient } = require('../controllers/userController')
const verifyToken = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/roleMiddleware')

// 👑 Solo superadmin puede crear admins
router.post(
    '/create-admin',
    verifyToken,
    checkRole('superadmin'),
    createAdmin
)

router.post(
    '/create-client',
    verifyToken,
    checkRole('admin'), // 👈 Solo admin
    createClient
)

module.exports = router