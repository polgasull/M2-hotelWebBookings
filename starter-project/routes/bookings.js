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

    Room.find({"nights.date": checkInDate, "nights.booked": false}, (err, bookings) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/index', { bookings });
        }   
    })
})

router.get('/new', (req, res, next) => {
    res.render('bookings/new');
  })
  
router.post('/success', (req, res, next) => {
    const bookingInfo = {
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate, 
      name: req.body.name,
      surname: req.body.surname,
      country: req.body.country,
      email: req.body.email,
    };
  
    const newBooking = new Booking(bookingInfo);
    newBooking.save( (err) => {
        if (err) { 
            return next(err) 
        } else {
            res.render('bookings/success');
        }
    });
});

module.exports = router;