const mongoose = require('mongoose');
const bcrypt  = require("bcrypt");
const bcryptSalt = 10;
const User = require('../models/user');
const Room = require('../models/room');

mongoose.connect(process.env.MONGODB_URI);
var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "ironhack";
var encryptedPass = bcrypt.hashSync(password, salt);

const users = [
  {
  username: 'UserAdmin',
  name: 'Pol',
  surname: 'Gasull',
  country: 'Spain',
  email: 'pol89.gn@gmail.com',
  password: encryptedPass,
  role: 'Admin'
},
 {
  username: 'Test1',
  name: 'Test1',
  surname: 'TestOne',
  country: 'Spain',
  email: 'TestOne.Fake@gmail.com',
  password: encryptedPass,
  role: 'CurrentUser'
},
 {
  username: 'Test2',
  name: 'Test2',
  surname: 'TestTwo',
  country: 'Spain',
  email: 'TestTwo.Fake@gmail.com',
  password: encryptedPass,
  role: 'CurrentUser'
},
];

const date = new Date('2017-09-12')
const date_2 = new Date('2017-09-13')

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
    night: [{date: date,booked: true},{date: date_2, booked: false}]
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
    night: [{date: date,booked: false},{date: date_2, booked: false}]
    },
];

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  };
  docs.forEach((user) => {
    console.log(user.name)
  })
});

Room.create(rooms, (err, docs)=>{
  if (err) { 
    throw err 
  };
    docs.forEach( (roomData) => {
      console.log(roomData.category)
    })
});

mongoose.connection.close();

