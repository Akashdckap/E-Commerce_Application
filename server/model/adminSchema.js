// const mongoose = require('mongoose');
import mongoose from "mongoose"

const userRegistration = mongoose.Schema({
    email:String,
    password:String
},{
    timestamps:true
})

// module.exports = mongoose.model('admins',userRegistration)
const admins = mongoose.model('admins',userRegistration);

export default admins;
