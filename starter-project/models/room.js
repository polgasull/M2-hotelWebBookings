const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    category: String,
    type: String,
    view: String,
    capacity: Number,
    size: Number,
    typeOfBed: String,
    description: String,
    price: Number,
    photo: String,
    nights: [{
        date: String,
        booked: Boolean,
        default: false
    }]
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;