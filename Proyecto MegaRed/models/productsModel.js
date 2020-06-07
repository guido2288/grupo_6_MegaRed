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
        //filtramos los datos
        return products.filter(function(p) {
            //hago que ambos string sean minusculas con .toLowerCase()
            //tambien para filtrar y que contenga en cualquier parte esa palabra que me pasaron "title"
            //para que funcione aplicamos una expresion regular, muy sencilla y facil
            search = new RegExp(title.toLowerCase())
            //luego aplicamos el search para hacer una busqueda de esas letras dentro del titulo de cada pelicula, retornara -1 si no la encuentra
            return p.titulo.toLowerCase().search(search) >= 0;
        });
    },


    
}

module.exports = productsModel;