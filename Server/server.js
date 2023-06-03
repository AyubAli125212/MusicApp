require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT;

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/roots'));
app.use('/harmony', require('./routes/music'));

// 404 not Found
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// built-in middleware for errpr handling 
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});