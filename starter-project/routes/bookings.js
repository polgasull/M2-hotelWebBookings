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

    Room.find({"nights.date": checkInDate, "nights.booked": false}, (err, roomBooking) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/new', { roomBooking });
        }   
    })
})

router.get('/new', (req, res, next) => {
    res.render('bookings/new');
})

router.post('/new', (req, res, next) => {
    const bookingInfo = {
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,       
    }
    
    const newBooking = new Booking(bookingInfo);
  
    newBooking.save((err) => {
        if (err) { 
            res.render("bookings/new", { message: "Something went wrong" });
        } else {
            res.render('bookings/edit');
        }
    });
});

module.exports = router;