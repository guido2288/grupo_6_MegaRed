
module.exports = {
    
    loginUser : function (req, res, user) {
        

        res.locals.logeado = true;
        res.locals.user = user;
        req.session.logeado = true;
        req.session.user = user;
        
    }
    
}