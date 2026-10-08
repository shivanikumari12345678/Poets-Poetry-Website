require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Mount API Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'बुलंदी साहित्य संस्थान | Bulandi Platform API (MERN Stack)',
    docs: '/api/health',
    version: '1.0.0',
    status: 'online',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Start listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🚀 Bulandi Backend Server Running on Port ${PORT}`);
  console.log(`  🔗 REST API URL: http://localhost:${PORT}/api`);
  console.log(`  🌿 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});
