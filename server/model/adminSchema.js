// const mongoose = require('mongoose');
import mongoose from "mongoose"

const userRegistration = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phoneNo:Number,
},{
    timestamps:true
})

// module.exports = mongoose.model('admins',userRegistration)
const admins = mongoose.model('admins',userRegistration);

export default admins;
