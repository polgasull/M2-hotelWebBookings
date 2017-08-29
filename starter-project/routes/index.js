const express = require('express');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");



/* GET home page. */
router.get('/', (req, res, next) => {
const isLogged = false; 

    if (req.isAuthenticated()) {   
        res.render('index', { isLogged }); 
        // $(".loginBtn, .signUpBtn").hide();
        // $(".myBookBtn, .roomsBtn, .usersBtn").show();
    } else {
        res.render('index');
        
    }
});



module.exports = router;
