const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bulandi_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Bulandi Backend] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`[Bulandi Backend] Warning: MongoDB Connection Error (${error.message}). Running with resilient memory store fallback.`);
    return false;
  }
};

module.exports = connectDB;
