const fs = require("fs");
const productModel = require('../models/productsModel');
const path = require("path")


let productsControllers = {
    products : function (req, res){
        let productos = [];
        //console.log(req.query.busqueda);
        if (req.query.busqueda) {
            //cree un metodo dentro del modelo para filtrarlos y le paso lo que viene por el formulario por get
           productos = productModel.filterByTitle(req.query.busqueda);
           //console.log(productos)
        } else {
        productos = productModel.findAll(); 
        }
        if(productos.length==0){
            res.render('home')
        }
        res.render("products", {productos})
    },
    formularioProducto: function(req,res){
        res.render("cargaProducto");
    },

    create: function (req, res, next){ 
        var imagen = "/imagenes/" + req.files[0].filename;
        
      
        let newProduct ={
            titulo : req.body.nombre,
            img: imagen,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            stock: req.body.stock
        } 
        //console.log(newProduct);

        productModel.create(newProduct);

        res.redirect("/products")

      
    },
   
    detalle: function(req,res){
        let producto= productModel.detalle(req.params.id);
        res.render("detalleProducto",{producto:producto})
    },

    formEdit: function(req,res){
        var producto = productModel.detalle(req.params.id)
        res.render("editarProducto",{producto})
    },
    edit: function(req , res, next){

        let producto = productModel.detalle(req.params.id);
        //console.log(producto);
        var imagen= "";
        console.log(req);
        if(req.files.length > 0){
            imagen = "/imagenes/" + req.files[0].filename;
        } else {
            imagen= producto.img;
        }

        let newProduct ={
            titulo : req.body.nombre,
            img: imagen,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            stock: req.body.stock,
            id: req.params.id
        };
      
        productModel.update(newProduct);
 

        
        res.redirect("/products")

    },
    delete: function(req , res){
        let producto = productModel.detalle(req.params.id);
        productModel.delete(producto)


        res.redirect("/products")
    }


}

module.exports = productsControllers;