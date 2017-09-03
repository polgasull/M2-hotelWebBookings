const express = require('express');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
    const checkIfIsLogged = req.user;
    console.log('roleplayer', checkIfIsLogged)

    res.render('index', {checkIfIsLogged});

});



module.exports = router;
