const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Set 'strictQuery' to false to prepare for Mongoose 7's default
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;