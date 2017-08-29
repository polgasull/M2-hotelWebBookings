const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    checkInDate: Date,
    checkOutDate: Date,
    room: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;