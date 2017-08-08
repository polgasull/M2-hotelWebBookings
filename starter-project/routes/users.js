var express = require('express');
var router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const User = require('../models/user');

router.get('/', checkRoles('Admin'), function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      next(err);
    } else {
      res.render('users/index', { users });
    }
  })
});

router.get('/:id/edit', checkRoles('Admin'), (req, res, next) => {
    const userID = req.params.id;
    User.findById(userID, (err, editUser) => {
        if (err) {
            next(err)
        } else  {
            res.render('users/edit', {editUser});
        }
    })
})

router.post('/:id', checkRoles('Admin'), (req, res, next) => {
    const userID = req.params.id;
    const updates = {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      country: req.body.country,
      email: req.body.email,
      role: req.body.role,
  };
    User.findByIdAndUpdate(userID, updates, (err, editUser) => {
        if (err) {
            next(err)
        } else {
            res.redirect('/users');
        }
    })
});

router.post('/:id/delete', checkRoles('Admin'), (req, res, next) => {
    const userID = req.params.id;
    User.findByIdAndRemove(userID, (err, deleteUser) => {
        if (err) {
            return next(err); 
        } else {
            res.redirect('/users');
        }
  });
})

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next(); 
    } else {
      res.redirect('/auth/login');
    }
  }
}


module.exports = router;
