const mongoose = require('mongoose');
const express = require('express')
const app =express();


const connectDB = async() =>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectDB;