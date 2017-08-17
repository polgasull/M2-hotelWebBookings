const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const Room = require("../models/room");

router.get('/', checkRoles('Admin'), (req, res, next) => {
    Room.find({}, (err, rooms) => {
        if (err) {
            next(err);
        }
        else {
            res.render('rooms/index', { rooms });
        }
    })
});

router.get('/new', checkRoles('Admin'), (req, res, next) => {
  res.render('rooms/new');
})

router.post('/', checkRoles('Admin'), (req, res, next) => {
  const roomInfo = {
    category: req.body.category,
    type: req.body.type, 
    view: req.body.view,
    capacity: req.body.capacity,
    size: req.body.size,
    typeOfBed: req.body.typeOfBed,
    description: req.body.description,
    price: req.body.price,
    nights: [
        { booked: req.body.booked },
        { date: req.body.date}
    ] 
  };

const newRoom = new Room(roomInfo);
newRoom.save( (err) => {
    if (err) { 
        return next(err) 
    } else {
        res.redirect('/rooms');
    }

  });
});

router.get('/:id/edit', checkRoles('Admin'), (req, res, next) => {
    const roomID = req.params.id;
    Room.findById(roomID, (err, editRoom) => {
        if (err) {
            next(err)
        } else  {
            res.render('rooms/edit', {editRoom});
        }
    })
})

router.post('/:id', checkRoles('Admin'), (req, res, next) => {
    const roomID = req.params.id;
    const updates = {
      category: req.body.category,
      type: req.body.type, 
      view: req.body.view,
      capacity: req.body.capacity,
      size: req.body.size,
      typeOfBed: req.body.typeOfBed,
      description: req.body.description,
      price: req.body.price,
  };
    Room.findByIdAndUpdate(roomID, updates, (err, editRoom) => {
        if (err) {
            next(err)
        } else {
            res.redirect('/rooms');
        }
    })
});

router.post('/:id/delete', checkRoles('Admin'), (req, res, next) => {
    const roomID = req.params.id;
    Room.findByIdAndRemove(roomID, (err, deleteRoom) => {
        if (err) {
            return next(err); 
        } else {
            res.redirect('/rooms');
        }
  });
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