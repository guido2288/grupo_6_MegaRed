let fs = require("fs");
let bcrypt = require ("bcrypt");
let {check, validationResult, body} = require ("express-validator");
const db = require("../database/models")
const loginService = require ("../Services/loginService");
const { locals } = require("../app");




let userController = {
    "register" : function(req, res) {
       res.render("register" , {errors : {} ,body : {} })
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
                return res.render("perfil");

             })
             .catch(function(error){
                 console.error(error);
                 return res.redirect("register")
             })

             
            }else {
                console.log(errors.mapped())
                return res.render ("register", {errors: errors.mapped() , body : req.body}  )
            }
       
     },


    
    
    "login" : function (req, res) {
         res.render("login" , {errors : {} , body : {} })
         console.log(res.locals.logeado)

    },
    "loginPost" : function (req, res) {
        //Errores campos vacios
        let errors = validationResult(req);
        console.log(errors.mapped());
        if(!errors.isEmpty()) { 
            return res.render ("login", {errors: errors.mapped() ,body : req.body}) 
            }; 



        
        //trabajo con BD Login
        db.Users.findOne({where : {name : req.body.usuario}}).then(async (user) => {

            //guardar la cookie de mantenerme Logueado
            if (req.body.recordar) {
            //cookie que expire en 90 días
            res.cookie("_rememberUser_", req.body.usuario, {expires: new Date(Date.now() + 1000*60*60*24*90)})
            }


            loginService.loginUser(req, res, user);
            
            console.log(res.locals.logeado)
            return res.redirect("/perfil") 
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
        "perfil" : function(req, res) {
            res.render("perfil")
        },
        "salir": function(req,res){
            loginService.logOutSession(req, res)

            res.redirect("/" )
        }
}
    


module.exports = userController;