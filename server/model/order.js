const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId

const placeOrder = mongoose.Schema({
    productId:{
        type:Array
    },
    quantity:String,
    name:String,
    email:String,
    phoneNo:Number,
    address:String,
    district:String,
    state:String,
    pincode:Number
},{
    timestamps:true
})

module.exports = mongoose.model('orders',placeOrder);