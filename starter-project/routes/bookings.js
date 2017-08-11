var express = require('express');
var router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");


router.post('/', (req, res, next) => {
    const viewVar = req.body.view
    const booked = req.body.booked
    const checkInDate = req.body.checkInDate;
    const checkOutDate = req.body.checkOutDate;
    const nightDate = {"nights.date": new Date()};
    const nightBooked = {"nights.booked": false};

    // const bookedFalse = {"nights.booked": false};

    Room.find({},(err, rooms) => {
        if (err) {
            next(err);
        }
        else if ({"nights.booked": false}) {
            nightDate === checkInDate;
            res.render('rooms/index', { rooms });
        }
        
    })
    })


    // Room.find({"nights.date": checkInDate}, (err, rooms) => {
    //     if ({"nights.booked": false}) {
    //         res.render('rooms/index', { rooms });
    //     }
    //     else if (err) {
    //         next(err);
    //     }
    // })
    

    // })

//     Room.find({"nights.booked": booked}, (err, rooms) => {
//         if (err) {
//             next(err);
//         }
//         else {
//             res.render('rooms/index', { rooms });
//         }
//     })
    
// })

module.exports = router;