

  // models/user.js
  const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    dateOfBirth: Date,
    otp: String,
    otpExpires: Date,
    email: String,
    emailotp: String, // Change to String if you want to use emailotp
    emailotpExpires: Date, // Change to Date if you want to use emailotpExpires
  });
  

  const User = mongoose.model('User', UserSchema);

  module.exports = User;


