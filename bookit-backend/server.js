const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Middlewares ---

// Enable CORS for React frontend
app.use(cors());

// Body parser middleware to accept JSON
app.use(express.json());

// --- API Routes ---
app.use('/api', require('./routes/index'));

// Simple root route
app.get('/', (req, res) => {
  res.send('BookIt API is running...');
});

// --- Error Handler ---
// (A more robust one would be in its own file)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});