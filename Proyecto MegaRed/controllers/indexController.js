module.exports ={
    index:(req, res)=>{
        res.send("home.html")
    },

    carritoCompras: (req, res)=>{
        res.send("carritoCompras.html")
    },

    detalleDeProducto : (req, res)=>{
        res.send("detalleDeProducto.html")
    },

    formularioCarga:(req, res)=>{
        res.send("formularioCarga.html")
    },

    register: (req, res)=>{
        res.send("register.html")
    }


 };