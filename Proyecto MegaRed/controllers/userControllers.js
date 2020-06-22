let fs = require("fs");
let bcrypt = require ("bcrypt");
let {check, validationResult, body} = require ("express-validator");

let userController = {
    "register" : function(req, res) {
       res.render("register")
    },
       create : function (req, res, next) {
           //Validación de usuario
             let errors = validationResult(req);

             if(errors.isEmpty()) {

             let usuario = {
                 name : req.body.usuario,
                 email : req.body.email,
                 password : bcrypt.hashSync(req.body.password, 10),
                 avatar : req.files[0].filename
             }
               //Leo archivo de usuarios
             let archivoUsers = fs.readFileSync("data/users.json", {encoding: "utf-8"});
               //Verificar si esta vacio
            let usuarios;

             if (archivoUsers == "") {
                usuarios = [];
             } else {
                 usuarios = JSON.parse(archivoUsers);
             };
                usuarios.push(usuario);

                usuariosJSON = JSON.stringify(usuarios);
                
             

             fs.writeFileSync("data/users.json", usuariosJSON);
             req.session.logeado = true;
             res.locals.logeado = true;

             res.redirect("/");
            }else {
                return res.render ("register", {errors: errors.errors} )
            }
       
     },


    "carrito" : function(req, res) {
        res.render("carrito")
    },
    "detalleProducto" : function(req, res) {
        res.render("detalleProducto")
    },
    "cargaProducto" : function(req, res) {
        res.render("cargaProducto")
    },
    "home" : function(req, res, next) {
        let usuarioLogueando = []
        console.log(usuarioLogueando);
        res.render("home", {usuarioLogueando : {}});
        
    },
    "login" : function (req, res) {
        res.render("login" , {errors : {}})
    },
    "loginPost" : function (req, res) {
        //Errores campos vacios
        let errors = validationResult(req);
        console.log(errors.mapped());
        if(!errors.isEmpty()) { 
            return res.render ("login", {errors: errors.errors}) 
            }; 

        //leo Json
        let archivoUsers = fs.readFileSync("data/users.json", {encoding: "utf-8"});

        usuarios = JSON.parse(archivoUsers);
        console.log(usuarios);

        //Recordarme
        if (req.body.recordar != undefined) {
        res.cookie("recordar", req.body.usuario, {expires: new Date(Date.now() + 1000*60*60*24*90)});
        } ;
    
        //Busco el usuario y la pass
        req.session.logeado = true;
        res.locals.logeado = true; 
        

        return res.redirect("/");

        
        } 
}
    


module.exports = userController;