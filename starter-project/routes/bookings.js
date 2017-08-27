var express = require('express');
var router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");

router.post('/', (req, res, next) => {
    const checkInDate = req.body.checkInDate;
    const checkOutDate = req.body.checkOutDate;
    const nightDate = {"nights.date": new Date()};
    const nightBooked = {"nights.booked": false};
    const updates = {
        nights: [{ booked: req.body.booked }]
        };

    Room.find({"nights.date": checkInDate, "nights.booked": false}, (err, roomAvailable) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/roomAvailable', { roomAvailable });
        }   
    })
});

// router.get('/new', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         res.render('bookings/new');
//     } else {
//         res.redirect('/auth/login');
//     }
// })

router.post('/new', (req, res, next) => {
    const roomInfo = {
        nights: [{ booked: req.body.booked, date: req.body.date }]
    };
    Room.update(roomInfo, (err) => {
        if (err) { 
            next(err);
        }  
        if (req.isAuthenticated()) {
            res.render('bookings/success');
        } 
        else {
            res.redirect('/auth/login');
        }
    });  
});

router.get('/myBookings', checkRoles('Admin'), (req, res, next) => {
    Booking.find({}, (err, myBookings) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/myBookings', { myBookings })
        }
    })
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