module.exports = {
	setCurrentUser: function(req, res, next) {
	  if (req.session.passport) {
			console.log('algo', req.user);
	    res.locals.currentUser = req.user;
	    res.locals.isUserLoggedIn = true;
	  } else {
	  	// delete res.locals.currentUser;
	    res.locals.isUserLoggedIn = false;
	  }
	  next();
	},

	checkLoggedIn: function(message, route) {
	  return function(req, res, next) {
	    if (req.isAuthenticated()) {
	      return next(); 
	    } else {
	    	req.flash('error', message )
	    	
	      res.redirect(route)
	    }
	  }
	},

	checkCredentials: function(role) {
	  return function(req, res, next) {
	    if (req.user.role === role) {
	      return next(); 
	    } else {
	    	req.flash('error', "you don't have permission" );
	      res.redirect('/login');
	    }
	  }
	},
}