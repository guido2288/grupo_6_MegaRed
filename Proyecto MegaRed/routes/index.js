var express = require('express');
var router = express.Router();
let userController = require("../controllers/userControllers");
let multer = require("multer");
let path = require("path");
let { check, validationResult, body } = require("express-validator");
let fs = require("fs");

const guestMdw = require ("../Middleware/guest");
const authMdw = require ("../Middleware/auth");


const db = require("../database/models")
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatar')
  },
  filename: function (req, file, cb) {
   return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage:storage})
/* GET home page. */
router.get("/", userController.home);
router.get("/register",guestMdw ,userController.register);
router.post("/register", upload.any(), [

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
  check("password").isLength({ min: 6 }).withMessage("El password debe tener 6 caracteres como mínimo"),
  body("Cpassword").custom((value, {req})=> {
    if (value !== req.body.password) {
      throw new Error("Los passwords no coinciden")
    }
    return true
  }),


], userController.create);

router.get("/login", guestMdw , userController.login);
router.post("/login" , [
  
  check("password").isLength({min:6}).withMessage("El password debe tener 6 caracteres como mínimo"),
  check("usuario").custom((value, {req}) => {
    return db.Users.findOne({where:{name : value}}).then(user => {
      
      if (user== null) {
        return Promise.reject("Usuario invalido");
      } else if (user && !bcrypt.compareSync(req.body.password , user.password)) {
          return Promise.reject("Password incorrecto");
      }
    })
  })

] , userController.loginPost);
router.get("/carrito",authMdw , userController.carrito);
router.get("/detalleProducto", userController.detalleProducto);
router.get("/cargaProducto", userController.cargaProducto);
router.get("/salir",userController.salir);




module.exports = router;
