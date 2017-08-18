const express = require('express');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

/* GET home page. */
router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {   
        res.render('index');
        $(".loginBtn, .signUpBtn").hide(); 
    } else {
        res.render('index');
    }
});



module.exports = router;
