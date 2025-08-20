const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];

    const authToken = authHeader && authHeader.split(" ")[1];

    if(!authToken){
        return res.status(401).json({
            success : false,
            message : 'Access denied or token not provided, Please login Again!'
        });
    }

    //decode the token and compare it
    try {
        const decoded = await jwt.verify(authToken, process.env.JWT_SECRET_KEY);

        // Attach user info to request
        req.user = await User.findById(decoded.id).select('-password');

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success : false,
            message : 'Invalid or expired Token, Please login Again!'
        })
    }
};

module.exports = authMiddleware;