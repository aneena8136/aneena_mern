const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/User');  // Import the existing User model

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

router.post('/email-otp/send', async (req, res) => {
    const { email } = req.body;
    
    try {
      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
  
      // Save OTP to user document
      await User.findOneAndUpdate(
        { email },
        { emailotp: otp, emailotpExpires: otpExpires },
        { upsert: true, new: true }
      );
  
      // Send OTP via email
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Send OTP error:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  });
  


  
  router.post('/email-otp/verify', async (req, res) => {
    console.log('hiiii')
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.emailotp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      if (user.emailotpExpires < new Date()) {
        return res.status(400).json({ message: 'OTP has expired' });
      }
  
      // Clear OTP after successful verification
      user.emailotp = undefined;
      user.emailotpExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Verify OTP error:', error);
      res.status(500).json({ message: 'Failed to verify OTP' });
    }
  });


  
  

module.exports = router;