var express = require('express');
var router = express.Router();
let userController = require ("../controllers/userControllers")

/* GET home page. */
router.get("/", userController.home);
router.get("/register", userController.register);
router.post("/register", userController.create);
router.get("/carrito", userController.carrito);
router.get("/detalleProducto", userController.detalleProducto);
router.get("/cargaProducto", userController.cargaProducto);
router.get("/login", userController.login);

module.exports = router;
