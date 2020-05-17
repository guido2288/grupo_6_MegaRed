const express= require("express");
const router= express.Router();
const controller= require("../controllers/indexController");



router.get("/", controller.index);

router.get("/carritoCompas", controller.carritoCompras );


router.get("/detalleDeProducto", controller.detalleDeProducto);


router.get("/formularioCarga", controller.formularioCarga);


router.get("/register", );

module.exports= router;