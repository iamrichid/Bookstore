require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConn');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDb();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


//serve static files


// routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/books', require('./routes/books'));

app.use(verifyJWT);

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

app.use(errorHandler);

// // Serve static files from the frontend build directory
// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Define API endpoints
// app.get('/api/data', (req, res) => {
//   // Your API logic here
//   res.json({ message: 'API endpoint reached' });
// });

// Serve the React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });

// Start the server if server connection works


mongoose.connection.once('open', () => {
   console.log('connected to MongoDB')
   app.listen(PORT, () => { 
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
   });
  });

