const fs = require("fs");


let productsControllers = {
    products : function (req, res){
        //leo archivo products.json
        let archivoUsers = fs.readFileSync("../data/products.json", {encoding: "utf-8"});
        if(!archivoUsers){
            res.send("ERROR")
        }



        res.render("products")
    }


}

module.exports = productsControllers;