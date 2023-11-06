require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

app.use(cookieParser());

// CORS 
app.use(
    cors({
        origin: 'http://localhost:3000', 
        credentials: true,
    })
);

// middleware
app.use(express.json()); // Allows for request body to be accessed by the request handler (getting /:id)

app.use((req, res, next) => {
    // console.log('[Server]: ', req.path, req.method, req.body, req.cookies);
    console.log('[Server]: ', req.path, req.method);
    next(); // this has to be called
});


// route handlers
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);


// Connect to the DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('[Server]: Connected to the database!');
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('[Server]: Listening on port: 4000');
        });
    })
    .catch((error) => {
        console.log(error)
    });
