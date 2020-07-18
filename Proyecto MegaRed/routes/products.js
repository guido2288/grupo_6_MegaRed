var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const {check, checkSchema, validationResult, body} = require('express-validator')

let userController = require ("../controllers/productsControllers");

//configuracion multer para subir la imagen
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'public/imagenes')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
  })
   
  var upload = multer({ storage: storage })




//listado productos
router.get("/", userController.products);

//envio productos a /products
router.post("/", upload.any(), userController.create); 

router.get("/create", userController.formularioProducto);

router.get("/:id", userController.detalle);

router.put("/:id",upload.any(), userController.edit);
router.delete("/:id",userController.delete);

router.get("/:id/edit", userController.formEdit);




module.exports = router;
