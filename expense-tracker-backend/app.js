const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4000', // your React app address
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

// Import routes (after middlewares)
const expenseRoutes = require('./routes/expenseRoutes');

// Mount routes after middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api', expenseRoutes);

// Connect to the database
const dbConnect = require("./config/database");
dbConnect();

// Start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});
