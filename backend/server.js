
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const otpRoutes = require('./routes/otpRoutes');
const emailRoutes = require('./routes/email-otp');
const aadhaarRoutes = require('./routes/aadhar');
const panRoutes = require('./routes/pan');
const addressRoutes = require('./routes/address');
const gstRoutes = require('./routes/gst');
const accountRoutes = require('./routes/account');





const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/', authRoutes);


app.use('/api', otpRoutes);
app.use('/api', emailRoutes);
app.use('/api', aadhaarRoutes);
app.use('/api', panRoutes);
app.use('/api', addressRoutes);
app.use('/api', gstRoutes);
app.use('/api', accountRoutes);





// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});