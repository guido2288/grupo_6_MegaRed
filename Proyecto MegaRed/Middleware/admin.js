
module.exports = function adminMdw (req, res, next) {
 let user = res.locals.user
     if (!req.session.logeado) {
    return res.redirect('/');
    }
    if (user.admin != 1) {
        return res.redirect('/');
    }
    
  next();  
}
