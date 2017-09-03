var express = require('express');
var router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");

router.post('/', (req, res, next) => {
    const checkInDate = req.body.checkInDate;
    const checkOutDate = req.body.checkOutDate;

    Room.find({"nights.date": checkInDate, "nights.booked": false}, (err, roomAvailable) => {
        if (err) {
            next(err);
        }
        else {
            res.render('bookings/roomAvailable', { roomAvailable, checkInDate });
        }   
    })
});

router.post('/:id/new', (req, res, next) => {
    console.log(req.body, "holi");
    const roomID = req.params.id;
    const checkInDate = req.body.checkInDate; 

    Room.findById(roomID, (err, room) => {
        if (err) { 
            next(err);
        }  
        else {
            console.log("checkin: ", checkInDate);
            console.log("Room: ", room);
            const dateToBook = room.nights.find(night => night.date === checkInDate);
            console.log('Soy la noche que buscas:', dateToBook);
            dateToBook.booked = true; 
            console.log("After save: ", room);
            room.save((err) => {
                if (err) {
                    next(err);
                } else {
                    res.render('bookings/success');
                }
            });
            
            // night => night.date === checkInDate

            // room.nights.findOne({date: checkInDate}, (err,night)=> {
            //     if (err){
            //         next(err);
            //     } else {
            //         night.booked = true;
            //         night.save(function(){
            //             res.render('bookings/success');
            //         })
            //     }
            // });
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