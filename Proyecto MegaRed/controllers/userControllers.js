let userController = {
    "register" : function(req, res) {
       res.render("register")
    },
    "carrito" : function(req, res) {
        res.render("carrito")
    },
    "detalleProducto" : function(req, res) {
        res.render("detalleProducto")
    },
    "cargaProducto" : function(req, res) {
        res.render("cargaProducto")
    },
    "home" : function(req, res) {
        res.render("home")
    }
};

module.exports = userController;