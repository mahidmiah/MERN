const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        // create a token
        const token = createToken(user._id);
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days (in milliseconds)
            sameSite: 'none', 
        }).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// Signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.signup(email, password);
        // create a token
        const token = createToken(user._id);
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days (in milliseconds)
            sameSite: 'none', 
        }).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const logoutUser = async (req, res) => {
    console.log('[Debug]: ', 'logout called!')
    res.status(200).cookie('access_token', '', { expires: new Date(0) }).json({message: 'Successfully logged out!'});
    console.log('[Debug]: ', 'logout call finished!')
}


module.exports = {
    signupUser, loginUser, logoutUser
}