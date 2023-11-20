const mongoose = require('mongoose');

const userRegistration = mongoose.Schema({
    email:String,
    password:String
})

module.exports = mongoose.model('admins',userRegistration)