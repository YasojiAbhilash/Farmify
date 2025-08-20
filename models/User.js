const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
            type : String,
            required : [true, 'Please enter your name'],
            unique : true,
            trim : true,
        },
        email : {
            type : String,
            required : [true, 'Please enter your email'],
            unique : true,
            lowercase : true,
            trim : true,
        },
        password : {
            type : String,
            required : [true, 'Please enter your password'],
            minlength : 6,
        },
        role : {
            type : String,
            enum : ['farmer', 'consumer', 'admin'],
            default : 'consumer'
        },
    },
    {timestamps : true},
);

module.exports = mongoose.model('User', userSchema);