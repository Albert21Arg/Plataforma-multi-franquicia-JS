const { UserFranchise } = require("../models")

const franchiseMiddleware = async (req, res, next) => {
  try {

    const franchiseId = req.headers["x-franchise-id"]

    if (!franchiseId) {
      return res.status(400).json({
        message: "Debe enviar x-franchise-id en el header"
      })
    }

    const relation = await UserFranchise.findOne({
      where: {
        userId: req.user.id,
        franchiseId: franchiseId
      }
    })

    if (!relation) {
      return res.status(403).json({
        message: "No perteneces a esta franquicia"
      })
    }

    req.franchiseId = franchiseId
    req.userRole = relation.role

    next()

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = franchiseMiddleware