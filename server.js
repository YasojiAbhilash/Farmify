require('dotenv').config();
const express = require('express');
const connectToDb = require('./config/farmify-db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

//port number
const PORT = process.env.PORT || 3000;

//database connection
connectToDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//routes
app.use('/farmify', authRoutes);
app.use('/farmify/products/', productRoutes);

//server listening
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})