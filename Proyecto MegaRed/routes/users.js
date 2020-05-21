var express = require('express');
var router = express.Router();
let userController = require ("../controllers/userControllers")
/* GET users listing. */


router.get("/", userController.home);
router.get("/register", userController.register);
router.get("/carrito", userController.carrito);
router.get("/detalleProducto", userController.detalleProducto);
router.get("/cargaProducto", userController.cargaProducto);
router.get("/login", userController.login);

module.exports = router;
