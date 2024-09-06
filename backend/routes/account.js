const express = require('express');
const router = express.Router();
const axios = require('axios');

// pan verification endpoint
router.post('/verify-account', async (req, res) => {
    const { account, ifsc } = req.body;

    if (!account) {
        return res.status(400).json({ message: 'account number is required' });
    }

    try {
        const response = await axios.post(
            'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account',
            {
                task_id: '123',
                group_id: '1234',
                data: {
                    bank_account_no: account,
                    bank_ifsc_code: ifsc
                }
            },
            {
                headers: {
                    'x-rapidapi-key': 'd37a1ceeafmsha70ec3e7f233a6ep1adbeejsn3baeb6d916a3',
                    'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
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


router.post('/get-account', async (req, res) => {
    const { id } = req.body;



    try {
        const response = await axios.get(
            `https://indian-bank-account-verification.p.rapidapi.com/v3/tasks?request_id=${id}`,
            {
                headers: {
                    'x-rapidapi-key': 'd37a1ceeafmsha70ec3e7f233a6ep1adbeejsn3baeb6d916a3',
    'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com'
                }
            }
        );
        const data = response.data;
        console.log(data);
        // res.json({ message: "Success", data: data });
        // // res.status(200).json(data);
        res.status(200).json(response.data);

    } catch (error) {
        console.error('pan verification error:', error);
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to verify gst' });
    }
});

module.exports = router;
