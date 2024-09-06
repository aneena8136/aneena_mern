const express = require('express');
const router = express.Router();
const axios = require('axios');

// pan verification endpoint
router.post('/verify-pan', async (req, res) => {
    const { pan } = req.body;

    if (!pan) {
        return res.status(400).json({ message: 'PAN number is required' });
    }

    try {
        const response = await axios.post(
            'https://aadhaar-number-verification-api-using-pan-number.p.rapidapi.com/api/validation/pan_to_aadhaar',
            {
                pan: pan,
                consent: 'y',
                consent_text: 'I hereby declare my consent agreement for fetching my information via AITAN Labs API'
            },
            {
                headers: {
                    'x-rapidapi-key': 'd37a1ceeafmsha70ec3e7f233a6ep1adbeejsn3baeb6d916a3',
                    'x-rapidapi-host': 'aadhaar-number-verification-api-using-pan-number.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            }
        );
        // const data = response;
        // res.json({ message: "Success", data: data });
        // // res.status(200).json(data);
        res.status(200).json(response.data);

    } catch (error) {
        console.error('pan verification error:', error);
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to verify pan' });
    }
});

module.exports = router;
