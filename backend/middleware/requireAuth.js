const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    const access_token = req.cookies.access_token;

    if(!access_token) {
        return res.status(401).json({error: 'Request is not authorized'}); 
    }

    try {
        const { _id } = jwt.verify(access_token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }

}

module.exports = requireAuth