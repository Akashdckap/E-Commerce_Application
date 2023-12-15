// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const ObjectId = mongoose.Types.ObjectId

const placeOrder = mongoose.Schema({

    products: {
        type: Array
    },
    // quantity: {
    //     type: Array
    // },
    firstName: String,
    lastName: String,
    email: String,
    phoneNo: Number,
    address: String,
    district: String,
    state: String,
    pincode: Number,
    country: String,
}, {
    timestamps: true
})

// module.exports = mongoose.model('orders',placeOrder);
const orders = mongoose.model('orders', placeOrder);
export default orders;