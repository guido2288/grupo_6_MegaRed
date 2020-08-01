var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
let { check, validationResult, body } = require("express-validator")

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
router.post("/" , upload.any(),
[ check("nombre").isLength({min:5}).withMessage("El titulo debe tener 5 caracteres como mínimo"),
check("descripcion").isLength({min:50}).withMessage("La descripcion debe tener 50 caracteres como mínimo"),
check("genre").isLength({min:1}).withMessage("Debes seleccionar el genero"),
check("platform").isLength({min:1}).withMessage("Debes seleccionar la plataforma"),
check("precio").isLength({min:1}).withMessage("Debes completar el precio"),
check("stock").isLength({min:1}).withMessage("Debes completar el stock"), 
body("imagen").custom((value, { req }) => {
  if(req.files.length>0){
    //console.log(req.files);
      const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
      const ext = path.extname(req.files[0].originalname)
      return acceptedExtensions.includes(ext);
  } else {
    return false
  }
    
  
  }).withMessage("La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG")], 

userController.create); 

router.get("/create", userController.formularioProducto);

router.get("/:id", userController.detalle);

router.put("/:id",upload.any(),

[ check("nombre").isLength({min:5}).withMessage("El titulo debe tener 5 caracteres como mínimo"),
check("descripcion").isLength({min:50}).withMessage("La descripcion debe tener 50 caracteres como mínimo"),
check("genre").isLength({min:1}).withMessage("Debes seleccionar el genero"),
check("platform").isLength({min:1}).withMessage("Debes seleccionar la plataforma"),
check("precio").isLength({min:1}).withMessage("Debes completar el precio"),
check("stock").isLength({min:1}).withMessage("Debes completar el stock"), 
body("imagen").custom((value, { req }) => {
  if(req.files.length>0){
    //console.log(req.files);
      const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
      const ext = path.extname(req.files[0].originalname)
      return acceptedExtensions.includes(ext);
  } else {
    return true
  }
    
  
  }).withMessage("La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG")],
  
  userController.edit);




router.delete("/:id",userController.delete);

router.get("/:id/edit", userController.formEdit);




module.exports = router;
