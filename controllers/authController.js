const User = require('../models/User');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken')
//register user api
const registerUser = async(req, res)=>{
    try {
        //extract all the data from the user
        const {username, email, password, role} = req.body;

        //check whether this user is already existing or not
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                    success : false,
                    message : 'This username or email already exists, Please Try Again!'
                })
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user and store in the database
        const newlyCreatedUser = await User.create({
            username,
            email,
            password : hashedPassword,
            role : role || 'consumer'
        });

        if(newlyCreatedUser){
            return res.status(201).json({
                    success : true,
                    message : 'User registered successfully',
                    data : newlyCreatedUser
                })
        } else{
            return res.status(400).json({
                    success : false,
                    message : 'Unable to register user, Please try Again!'
                })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong, Please Try Again!'
        })
    }
};


//login user api
const loginUser = async(req, res)=>{
    try {
        //extract the username, password
        const {username, password} = req.body;

        //check if the current user exists or not
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                success : false,
                message : `username doesn't exists`
            })
        }

        //compare the password through the bcryptjs package
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if(!isMatchedPassword){
            return res.status(401).json({
                success : false,
                message : 'Invalid Credentials'
            })
        }

        //access token through jwt
        const accessToken = generateToken(user._id, user.role);
        

        return res.status(200).json({
            success : true,
            message : 'User Login successful',
            data : {
                username: user.username,
                email : user.email,
                role: user.role,
            },
            accessToken
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong, Please Try Again!'
        });
    }
};

module.exports = {registerUser, loginUser};