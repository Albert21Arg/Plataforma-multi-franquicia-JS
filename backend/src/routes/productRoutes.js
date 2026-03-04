router.get(
  '/',
  verifyToken,
  checkRole('cliente'),
  getProducts
)