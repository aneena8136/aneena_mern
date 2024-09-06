// models/EmailOtp.js
const mongoose = require('mongoose');

const EmailOtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
});

const EmailOtp = mongoose.model('EmailOtp', EmailOtpSchema);

module.exports = EmailOtp;
