const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();
// Connect to database
connectDB();

const app = express();
// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api', require('../routes/index'));

// Root route
app.get('/', (req, res) => {
  res.send('BookIt API is running...');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
  });
});

// Export the app (Vercel handles the request lifecycle)
module.exports = app;
