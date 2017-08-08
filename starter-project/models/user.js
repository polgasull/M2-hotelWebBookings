const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  surname: String,
  country: String,
  email: String,
  password: String,
  bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }],
  role: {
    type: String,
    enum : ['User', 'Admin'],
    default : 'User'
  },
  facebookID: String,
  googleID: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;