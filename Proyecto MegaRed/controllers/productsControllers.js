const fs = require("fs");
const productModel = require('../models/productsModel');


let productsControllers = {
    products : function (req, res){
        let productos = [];
        if (req.query.busqueda) {
            //cree un metodo dentro del modelo para filtrarlos y le paso lo que viene por el formulario por get
           productos = productModel.filterByTitle(req.query.busqueda);
        } else {

        productos = productModel.findAll(); 
        res.render("products", {productos:productos})
        }
    }
    


}

module.exports = productsControllers;