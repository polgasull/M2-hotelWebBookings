require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt  = require("bcrypt");
const bcryptSalt = 10;
const User = require('../models/user');
const Room = require('../models/room');

mongoose.connect(process.env.MONGODB_URI);
var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "ironhack";
var encryptedPass = bcrypt.hashSync(password, salt);

const rooms = [
    {
    category: "Estándar",
    type: "Doble",
    view: "Interior",
    capacity: 2,
    size: 20,
    typeOfBed: "Dos camas individuales",
    description: "Encantadora habitación decorada con detalles rústicos",
    price: 100,
    photo: "http://maxpixel.freegreatpicture.com/static/photo/2x/New-Hotel-Guest-Room-1330846.jpg",
    nights: [
      { date: '2017-09-12', booked: false }, 
      { date: '2017-09-13', booked: false }
    ]
    },
    {
    category: "Suite",
    type: "Doble",
    view: "Montaña",
    capacity: 2,
    size: 50,
    typeOfBed: "Cama de matrimonio",
    description: "Habitación de ensueño con bañera de hidromasaje",
    price: 200,
    photo: "http://maxpixel.freegreatpicture.com/static/photo/2x/Accommdation-Delhi-Near-Delhi-Igi-Airport-Hotel-Room-992296.jpg",
    nights: [
      { date: '2017-09-12', booked: false },
      { date: '2017-09-13', booked: false }
    ]
    },
];

Room.create(rooms, (err, docs)=>{
  if (err) { 
    throw err 
  };
    docs.forEach( (roomData) => {
      console.log(roomData.category)
    })
});

mongoose.connection.close();

