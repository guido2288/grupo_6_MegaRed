const fs = require("fs");


let productsControllers = {
    products : function (req, res){


        res.render("products")
    }


}

module.exports = productsControllers;