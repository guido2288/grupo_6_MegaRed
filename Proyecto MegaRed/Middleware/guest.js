//Si ya estoy logueado
module.exports = function guestMdw (req, res, next) {

	if (req.session.logeado) {
		return res.redirect('/');
  }
    
  next();  
}