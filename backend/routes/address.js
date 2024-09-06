const express = require('express');
const router = express.Router();
const axios = require('axios');

// Aadhaar verification endpoint
router.post('/verify-address', async (req, res) => {
  const { address } = req.body;
  console.log(address)

  if (!address) {
    return res.status(400).json({ message: 'Pin number is required' });
  }

  try { 
    
    const response = await axios.get(`https://api.postalpincode.in/pincode/${address}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the response data for debugging
    console.log('External API response data:', response.data);

    res.status(200).json({ message: 'Verification successful', data: response.data });
  } catch (error) {
    console.error('Pin verification error:', error.message);
    console.error('Error response:', error.response?.data); // Log response details if available
    res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data?.message || 'Failed to verify pin' });
  }
});

module.exports = router;
