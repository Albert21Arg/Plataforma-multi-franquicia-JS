const { FranchiseUser } = require("../models")

const franchiseMiddleware = async (req, res, next) => {
  try {

    const franchiseId = req.headers["x-franchise-id"]

    if (!franchiseId) {
      return res.status(400).json({
        message: "Debe enviar x-franchise-id en el header"
      })
    }

    const relation = await FranchiseUser.findOne({
      where: {
        user_id: req.user.id,
        franchise_id: franchiseId
      }
    })

    req.franchiseId = franchiseId

    if (relation) {
      req.userRole = relation.role
    } else {
      req.userRole = "customer"
    }

    next()

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = franchiseMiddleware