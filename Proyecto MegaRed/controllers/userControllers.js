let fs = require("fs");
let bcrypt = require ("bcrypt");
let {check, validationResult, body} = require ("express-validator");

const db = require("../database/models")
let usuarioAloguearse 
var usuario



let userController = {
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
             //almacenar Usuario registrado en BD
             db.Users.create(usuario).then(function(){
                req.session.logeado = true;
                res.locals.logeado = true;
                usuarioAloguearse = usuario;
                return res.render("home");

             })
             .catch(function(error){
                 console.error(error);
                 return res.redirect("register")
             })

             
            }else {
                return res.render ("register", {errors: errors.errors} )
            }
       
     },


    
    
    "login" : function (req, res) {
         res.render("login" , {errors : {}})
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
            return res.render ("login", {errors: errors.errors}) 
            }; 

        
        //trabajo con BD
        //almacenar en una variable el usuario y la pass encriptada
        let usuario = req.body.usuario
        let password = req.body.password

        //busco por usuario con el metodo findOne
        db.Users.findAll({
            where : {
                name : usuario
                       
            }
        }).then((resultado)=>{
            console.log(resultado)
            return res.send(resultado)
        })

        
        
        //Recordarme
        if (req.body.recordar != undefined) {
            res.cookie("recordar", req.body.usuario, {expires: new Date(Date.now() + 1000*60*60*24*90)});
            } ;

        //CODIGO VIEJO
        //leo Json    
        /*
        let archivoUsers = fs.readFileSync("data/users.json", {encoding: "utf-8"});

        let usuarios = JSON.parse(archivoUsers);
        console.log(usuarios);
        

        
    
        
        //Busco el usuario y la pass
        usuarios.forEach(element => {
            if (element.name == req.body.usuario &&  bcrypt.compareSync(req.body.password,element.password )) {
                console.log("encontrado")
                req.session.logeado = true;
                res.locals.logeado = true; 
                
                usuarioAloguearse = usuarios.filter(user=>user.name==req.body.usuario);
                console.log(usuarioAloguearse)
            
                
                return res.render("home")
               
            } 

                

            }); 

            return res.render("login") */
        
       
        } ,
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
        },
        "salir": function(req,res){
            req.session.logeado = false;

            res.redirect("/")
        }
}
    


module.exports = userController;