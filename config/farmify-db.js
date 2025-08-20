const mongoose = require('mongoose');

const connectToDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected successfully`);
        
    } catch (error) {
        console.log('Mongodb connection failed');
        process.exit(1);
    }
};

module.exports = connectToDb;