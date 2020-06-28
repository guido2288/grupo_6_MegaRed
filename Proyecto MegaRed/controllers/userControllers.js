let fs = require("fs");
let bcrypt = require ("bcrypt");
let {check, validationResult, body} = require ("express-validator");
let usuarioAloguearse 
var usuario



let userController = {
<<<<<<< HEAD

=======
    "home" : function(req, res) {
        console.log(usuarioAloguearse)
        
        res.render("home", {usuarioAloguearse} );
        
    },
>>>>>>> 635bd597ef7d5d119072cb7ae2102f00aa094c43
    "register" : function(req, res) {
       res.render("register")
    },
       create : function (req, res, next) {
           //Validación de usuario
             let errors = validationResult(req);

             if(errors.isEmpty()) {

              usuario = {
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
                
                console.log("este esesese"+ req.session)
             

             fs.writeFileSync("data/users.json", usuariosJSON);
             req.session.logeado = true;
             

             usuarioAloguearse = usuario;

<<<<<<< HEAD
             

             return res.render("home");
=======

             return res.redirect("/");
>>>>>>> 635bd597ef7d5d119072cb7ae2102f00aa094c43
            }else {
                return res.render ("register", {errors: errors.errors} )
            }
       
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

        let usuarios = JSON.parse(archivoUsers);
        console.log(usuarios);

        //Recordarme
        if (req.body.recordar != undefined) {
        res.cookie("recordar", req.body.usuario, {expires: new Date(Date.now() + 1000*60*60*24*90)});
        } ;
    
        
        //Busco el usuario y la pass
        usuarios.forEach(element => {
            if (element.name == req.body.usuario &&  bcrypt.compareSync(req.body.password,element.password )) {
                console.log("encontrado")
                req.session.logeado = true;
                res.locals.logeado = true; 
                
                usuarioAloguearse = usuarios.filter(user=>user.name==req.body.usuario);
                console.log(usuarioAloguearse)
            
<<<<<<< HEAD
                
                return res.render("home")
=======
                return res.redirect("/")
>>>>>>> 635bd597ef7d5d119072cb7ae2102f00aa094c43
               
            } 

                

            });

            return res.render("login")
        
       
        } ,
<<<<<<< HEAD
        "home" : function(req, res) {
            res.render("home", );
            
        },
        "carrito" : function(req, res) {
            res.render("carrito" )
        },
        "detalleProducto" : function(req, res) {
            res.render("detalleProducto" )
        },
        "cargaProducto" : function(req, res) {
            res.render("cargaProducto")
=======
       
        "carrito" : function(req, res) {
            res.render("carrito", {usuarioAloguearse})
        },
        "detalleProducto" : function(req, res) {
            res.render("detalleProducto" ,{usuarioAloguearse})
        },
        "cargaProducto" : function(req, res) {
            res.render("cargaProducto", {usuarioAloguearse})
>>>>>>> 635bd597ef7d5d119072cb7ae2102f00aa094c43
        },
        "salir": function(req,res){
            req.session.logeado = false;

            res.redirect("/")
        }
}
    


module.exports = userController;