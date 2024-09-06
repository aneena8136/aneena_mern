const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const router = express.Router();




// Registration Route (Unchanged)
router.post('/api/register', async (req, res) => {
  try {
    const { name,dateOfBirth } = req.body;
    // Check if user +already exists
    
    
    const user = new User({
      name,
      dateOfBirth
    });
    const newUser= await user.save();
    const userId = newUser._id;
    
    res.status(201).json({sucess:true, message: 'User registered successfully',userId });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message|| error.response.data });
  }
});


 
    


module.exports = router;
