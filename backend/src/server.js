require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Load MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri);

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Your other app setup and routes...

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
