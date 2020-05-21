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
    },
    "login" : function (req, res) {
        res.render("login")
    }
};

module.exports = userController;