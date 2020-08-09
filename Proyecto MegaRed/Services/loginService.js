
module.exports = {
 
    loginUser : function (req, res, user) {
        
        res.locals.logeado = true;
        res.locals.user = user; 
        req.session.logeado = true;
        req.session.user = user;
     
    },
    logOutSession: function (req,res) {
       
            req.session.logeado = false;
            res.locals.user = false; 
            res.locals.logeado = false;
            req.session.user = false;
        console.log(res.locals.logeado)
    }
    
}