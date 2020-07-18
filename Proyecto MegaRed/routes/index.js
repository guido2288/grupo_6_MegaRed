var express = require('express');
var router = express.Router();
let userController = require("../controllers/userControllers");
let multer = require("multer");
let path = require("path");
let { check, validationResult, body } = require("express-validator");
let fs = require("fs");
const guestMdw = require ("../Middleware/guest")
const db = require("../database/models")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatar')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

/* GET home page. */
router.get("/", userController.home);
router.get("/register",guestMdw, userController.register);
router.post("/register", guestMdw, upload.any(), [

  check("usuario").isLength({ min: 1 }).withMessage("El Usuario no puede estar vacio"),
  check("email").isLength({ min: 1 }).withMessage("El Email no puede estar vacio")
   //validacion de email por BD
    .custom(function(value){
      return db.Users.findOne({where : {email : value}}).then(user => {
        if (user != null){
          return Promise.reject("El mail ya esta en uso")
        }
      })

    }),
  check("password").isLength({ min: 6 }).withMessage("El password debe tener 8 caracteres como mínimo"),
  body("Cpassword").custom((value, {req})=> {
    if (value !== req.body.password) {
      throw new Error("Los passwords no coinciden")
    }
    return true
  }),
  /*
  body("avatar").custom((value,{ req }) => {
    if(req.file != undefined){
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(req.file.originalname)
        return acceptedExtensions.includes(ext); 
    }
    return false ;
  }).withMessage('La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG'), */


], userController.create);
router.get("/carrito", userController.carrito);
router.get("/detalleProducto", userController.detalleProducto);
router.get("/cargaProducto", userController.cargaProducto);
router.get("/login", guestMdw , userController.login);
router.post("/login", guestMdw  , [
  check("usuario").isLength({min:1}).withMessage("El Usuario no puede estar vacio"),
  check("password").isLength({min:8}).withMessage("El password debe tener 8 caracteres como mínimo")

] , userController.loginPost);
router.get("/salir",userController.salir)



module.exports = router;
