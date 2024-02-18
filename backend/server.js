const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConn');



const app = express();
const PORT = process.env.PORT || 5000;

const bookRoutes = require('./routes/api/books');

app.use('/books',bookRoutes)


// Connect to DB
connectDb();


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

