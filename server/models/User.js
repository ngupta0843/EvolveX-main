const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  mentorVerificationToken: { type: String },
  mentorVerificationTokenExpiration: { type: Date },
  isMentorVerified: {
    type: Boolean,
    default: false
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;