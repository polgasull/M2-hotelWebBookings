var express = require('express');
var router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");


router.post('/', (req, res, next) => {
    const viewVar = req.body.view
    const bookedVar = req.body.booked
    Room.find({ booked: bookedVar}, (err, rooms) => {
        if (err) {
            next(err);
        }
        else {
            res.render('rooms/index', { rooms });
        }
    })
    // const checkInDate = req.body.checkInDate;
    // const checkOutDate = req.body.checkOutDate;
})

module.exports = router;