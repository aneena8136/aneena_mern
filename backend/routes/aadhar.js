const express = require('express');
const router = express.Router();
const axios = require('axios');

// Aadhaar verification endpoint
router.post('/verify-aadhaar', async (req, res) => {
  const { aadhaar } = req.body;

  if (!aadhaar) {
    return res.status(400).json({ message: 'Aadhaar number is required' });
  }

  try {
    const response = await axios.post('https://api.apyhub.com/validate/aadhaar', {
      aadhaar
    }, {
      headers: {
        'Content-Type': 'application/json',
        'apy-token': 'APY00CAxaeUAE7Qc2TwwMOpyf93TgjKZeOjRCNtOJbpKRXQAYBGVjO5SfjjwJYCGYp8AChFz'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Aadhaar verification error:', error);
    res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to verify Aadhaar' });
  }
});

module.exports = router;
