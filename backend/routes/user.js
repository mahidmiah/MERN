const express = require('express');
const {signupUser, loginUser, logoutUser} = require('../controllers/userController')


const router = express.Router();

// Login route
router.post('/login', loginUser);


// Signup route
router.post('/signup', signupUser);

//Logout route
router.post('/logout', logoutUser);


module.exports = router