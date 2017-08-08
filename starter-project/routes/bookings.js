var express = require('express');
var router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");


router.post('/', (req, res, next) => {
    const view = req.body.view
    Room.find({ view: view}, (err, rooms) => {
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