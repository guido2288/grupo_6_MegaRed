const fs = require("fs");
const productModel = require('../models/productsModel');
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");




let productsControllers = {
    products : function (req, res){
        if (req.query.busqueda) {
       db.Products.findAll({
           where: {
               name : {[Op.like]: "%"+ req.query.busqueda + "%"}
           }, 
            order: [
                ["name", "ASC"]
            ]
        })
       .then(function(productos){
           return res.render("products", {productos})
       }).catch(function(error){
        console.log(error);
       });
        } else {
            db.Products.findAll()
            .then(function(productos){
                return res.render("products", {productos})
            }) 
        }
        
    },
    formularioProducto: function(req,res){

            db.Platform.findAll()
            .then(function(platform){
                db.Genres.findAll().
                then(function(generos){
                    res.render("cargaProducto", {generos, platform});
                })

            })

           
 
        
    },

    create: function (req, res, next){ 
        var imagen = "/imagenes/" + req.files[0].filename;
        
      
        db.Products.create({
            name : req.body.nombre,
            img: imagen,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            genreId: req.body.genre,
            platformId: req.body.platform,
            stock: req.body.stock
        }).then(function(){
            res.redirect("/products")
        })
        
        
        .catch(function(error){
            console.log(error);
        }) 
        //console.log(newProduct);

        

      
    },
   
    detalle: function(req,res){
        db.Products.findByPk(req.params.id,{
            // Hay un problema para agregar la asociacion con genre me dice: Association with alias "genre" does not exist on Products.
            // me fije y esta igual configurado que platform (que si funciona).
            include:[ "platform"]})
        .then(function(producto){
            res.render("detalleProducto",{producto:producto})
        });

    },

    formEdit: function(req,res){
        
        db.Products.findByPk(req.params.id)
        .then(function(producto){
            db.Platform.findAll()
            .then(function(platform){
                db.Genres.findAll().
                then(function(generos){
                    res.render("editarProducto",{producto, platform, generos}) 
                })

            })
            
        });
    },
    edit: function(req , res, next){
        db.Products.findByPk(req.params.id)
        .then(function(producto){
            var producto = producto
            var imagen= "";
            console.log(req);
            if(req.files.length > 0){
                imagen = "/imagenes/" + req.files[0].filename;
            } else {
                imagen= producto.img;
            }
            db.Products.update({
                name : req.body.nombre,
                img: imagen,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                genreId: req.body.genre,
                platformId: req.body.platform,
                stock: req.body.stock
                },{
                    where: {id: req.params.id}
                }).then(function(){
                    res.redirect("/products")
                })
        })
    },
    delete: function(req , res){
        

        db.Products.destroy({
            where: {id : req.params.id}
        }).then(function(){


        res.redirect("/products")
         })
    }
    


}

module.exports = productsControllers;