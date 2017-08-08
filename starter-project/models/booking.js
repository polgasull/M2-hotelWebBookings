const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    checkInDate: Date,
    checkOutDate: Date,
    totalPrice: Number,
    roomId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;