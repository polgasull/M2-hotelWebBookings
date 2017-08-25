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

    Room.find({"nights.date": checkInDate, "nights.booked": false}, (err, roomAvailable) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/roomAvailable', { roomAvailable });
        }   
    })
});

router.get('/new', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('bookings/new');
    } else {
        res.redirect('/auth/login');
    }
})

router.post('/new', (req, res, next) => {
    const roomInfo = {
        nights: [{ booked: req.body.booked }]
    };

    Room.update({roomInfo}, (err) => {
        if (err) { 
            next(err);
        } 
        else {
            res.render('bookings/success');
        }
    });
});

router.get('/myBookings', (req, res, next) => {
    Booking.find({}, (err, myBookings) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/myBookings', { myBookings })
        }
    })
})


module.exports = router;