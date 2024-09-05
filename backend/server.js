const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorMiddleware = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware for logging requests in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Admin routes
app.use('/api/admin', adminRoutes);

// Middleware to parse JSON data
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/products', productRoutes);  // Product routes
app.use('/api/orders', orderRoutes);  // Order routes

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
