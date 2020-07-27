let fs = require("fs");
let bcrypt = require ("bcrypt");
let {check, validationResult, body} = require ("express-validator");
const db = require("../database/models")
const loginService = require ("../Services/loginService")




let userController = {
    "register" : function(req, res) {
       res.render("register" , {body : {} })
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
             //almacenar Usuario registrado en BD
             db.Users.create(usuario).then(function(user){
                loginService.loginUser(req, res, user);              
                return res.render("home", {usuario: usuario.name});

             })
             .catch(function(error){
                 console.error(error);
                 return res.redirect("register")
             })

             
            }else {
                return res.render ("register", {errors: errors.errors , body : req.body}  )
            }
       
     },


    
    
    "login" : function (req, res) {
         res.render("login" , {errors : {} , body : {}})
        //aca va con la base de datos
        db.Users.findAll()
            .then(function(resultado){
                return res.send(resultado)
            })
    },
    "loginPost" : function (req, res) {
        //Errores campos vacios
        let errors = validationResult(req);
        console.log(errors.mapped());
        if(!errors.isEmpty()) { 
            return res.render ("login", {errors: errors.errors ,body : req.body}) 
            }; 

        

        
        //trabajo con BD Login
        db.Users.findOne({where : {name : req.body.usuario}}).then(async (user) => {
            loginService.loginUser(req, res, user);
            
                    
            return res.render("home", {usuario: req.session.user}) 
        }).catch((error) => {
            console.error(error);
            return res.redirect('login');
        })      
        


        
        } ,
        "home" : function(req, res) {
            res.render("home",{usuario: req.session.user} );
            
        },
        "carrito" : function(req, res) {
            res.render("carrito",{usuario: req.session.user} )
        },
        "detalleProducto" : function(req, res) {
            res.render("detalleProducto",{usuario: req.session.user} )
        },
        "cargaProducto" : function(req, res) {
            res.render("cargaProducto",{usuario: req.session.user})
        },
        "salir": function(req,res){
            req.session.logeado = false;

            res.redirect("/")
        }
}
    


module.exports = userController;