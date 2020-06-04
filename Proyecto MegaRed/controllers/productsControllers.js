const fs = require("fs");


let productsControllers = {
    products : function (req, res){
        let productos = JSON.parse(fs.readFileSync("./data/products.json" , {encoding: "utf-8"}));
       // console.log(productos)
        res.render("products", {productos:productos})
    }


}

module.exports = productsControllers;