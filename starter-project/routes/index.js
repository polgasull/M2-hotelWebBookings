const express = require('express');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log('Usuario conectado:', req.user)
    res.render('index');

});



module.exports = router;
