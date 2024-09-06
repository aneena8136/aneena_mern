const express = require('express');
const router = express.Router();
const axios = require('axios');

// pan verification endpoint
router.post('/verify-gst', async (req, res) => {
    const { gst } = req.body;

    if (!gst) {
        return res.status(400).json({ message: 'GST number is required' });
    }

    try {
        const response = await axios.post(
            'https://gst-verification.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_gst_certificate',
            {
                task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1',
                group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',
                data: {
                    gstin: gst
                }
            },
            {
                headers: {
                    'x-rapidapi-key': 'd37a1ceeafmsha70ec3e7f233a6ep1adbeejsn3baeb6d916a3',
                    'x-rapidapi-host': 'gst-verification.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = response.data;
        console.log(data)
        // res.json({ message: "Success", data: data });
        // // res.status(200).json(data);
        res.status(200).json(response.data);

    } catch (error) {
        console.error('pan verification error:', error);
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to verify gst' });
    }
});

module.exports = router;
