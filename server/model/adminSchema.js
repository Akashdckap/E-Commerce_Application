const mongoose = require('mongoose');

const userRegistration = mongoose.Schema({
    email:String,
    password:String
},{
    timestamps:true
})

module.exports = mongoose.model('admins',userRegistration)