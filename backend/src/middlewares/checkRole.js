const checkRole = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: "No tienes permiso" })
    }

    next()
  }

}

module.exports = checkRole