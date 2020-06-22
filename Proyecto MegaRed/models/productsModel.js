const fs = require("fs");
const path = require('path');


const fileData = path.join(__dirname, '../data/products.json');


let productsModel = {
    findAll : function () {
        
        if (!fs.existsSync(fileData)) {
            fs.writeFileSync(fileData, '');
        }
        //leo el archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');

        //convertir a array de js ese json, validando que tenga o no datos
        let products = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return products;
    },
    filterByTitle : function(title) {
       
        let products = this.findAll();
        var array= [];
        //console.log(products[6].titulo);
        //console.log(products);
        for(let i=0; i<products.length; i++){
            //console.log(products[i].titulo)
            if (products[i].titulo.indexOf(title) != -1){
                array.push(products[i]);
            }
        }
        return array
    },
    detalle : function (e) {
        let product= this.findAll();
        //console.log(product)
        product = product.find( p => e == p.id)
       
        return product;
    },
        create : function (product) {
        let array = this.findAll();
        //le asigno el ultimo id
        product.id = this.lastID();
        //meto la pelicula
        array.push(product);
        //convertir a json ese array con la peli nueva
        jsonData = JSON.stringify(array, null, " ");
        //escribo
        fs.writeFileSync(fileData, jsonData);
    },
        lastID: function(){
        let array = this.findAll();
        let lastID = 0;
        for (product of array) {
            if (lastID < product.id) {
                lastID = product.id;
            }
        }
        lastID++
        return lastID ;
    },
        update: function(producto){
            let array = this.findAll();
            
            //saco la peli anterior
            array = array.filter(function(algo) {
                return algo.id != producto.id ;
            });
            //pusheo la que me lelgo por parametro
            array.push(producto);
    
            //convertir a json ese array con la peli nueva
            jsonData = JSON.stringify(array, null, " ");
            //escribo
            fs.writeFileSync(fileData, jsonData);
        },
        delete: function(producto){
            let array = this.findAll();
            
            //saco la peli anterior
            array = array.filter(function(algo) {
                return algo.id != producto.id ;
            });

            jsonData = JSON.stringify(array, null, " ");

            fs.writeFileSync(fileData, jsonData);
        }
    
}

module.exports = productsModel;