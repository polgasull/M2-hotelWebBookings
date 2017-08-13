var express = require('express');
var router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");


router.post('/', (req, res, next) => {
    const checkInDate = req.body.checkInDate;
    const checkOutDate = req.body.checkOutDate;
    const nightDate = {"nights.date": new Date()};
    const nightBooked = {"nights.booked": false};

    Room.find({"nights.date": checkInDate, "nights.booked": false}, (err, rooms) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/index', { rooms });
        }   
    })
})





module.exports = router;