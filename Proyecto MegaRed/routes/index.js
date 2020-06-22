var express = require('express');
var router = express.Router();
let userController = require("../controllers/userControllers");
let multer = require("multer");
let path = require("path");
let { check, validationResult, body } = require("express-validator");
let fs = require("fs");
const guestMdw = require ("../Middleware/guest")

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
  check("email").isLength({ min: 1 }).withMessage("El Email no puede estar vacio"),
  check("password").isLength({ min: 8 }).withMessage("El password debe tener 8 caracteres como mínimo"),
  body("Cpassword").custom((value, {req})=> {
    if (value !== req.body.password) {
      throw new Error("Los passwords no coinciden")
    }
    return true
  }),


  body("email").custom(function (value) {
    let usersJSON = fs.readFileSync("data/users.json", { encoding: "utf-8" })
    if (usersJSON == "") {
      usuarios = [];
    } else {
      usuarios = JSON.parse(usersJSON);
    };
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email == value) {
        return false
      }
    }
    return true;

  }).withMessage("El email ya esta registrado")


], userController.create);
router.get("/carrito", userController.carrito);
router.get("/detalleProducto", userController.detalleProducto);
router.get("/cargaProducto", userController.cargaProducto);
router.get("/login", guestMdw , userController.login);
router.post("/login", guestMdw  , [
  check("usuario").isLength({min:1}).withMessage("El Usuario no puede estar vacio"),
  check("password").isLength({min:8}).withMessage("El password debe tener 8 caracteres como mínimo")

] , userController.loginPost);


module.exports = router;
