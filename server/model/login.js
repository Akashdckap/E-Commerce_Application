const mongoose = require('mongoose');

const userRegistration = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoose.model('registrations',userRegistration)