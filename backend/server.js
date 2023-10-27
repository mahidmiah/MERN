require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// middleware
app.use(express.json()); // Allows for request body to be accessed by the request handler (getting /:id)

app.use((req, res, next) => {
    console.log('[Server]: ', req.path, req.method);
    next(); // this has to be called
});

// route handlers
app.use('/api/workouts', workoutRoutes);

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
