const express = require('express');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");



/* GET home page. */
router.get('/', (req, res, next) => {
// const checkIfIsLogged = req.user;
    if (req.isAuthenticated()) {  
        // console.log('roleplayer', checkRole)
        
        res.render('index'); 
        // $(".loginBtn, .signUpBtn").hide();
        // $(".myBookBtn, .roomsBtn, .usersBtn").show();
    } else {
        // console.log('roleplayer', checkIfIsLogged)
        res.render('index');
    }
});



module.exports = router;
