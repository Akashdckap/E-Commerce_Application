// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const ObjectId = mongoose.Types.ObjectId

const placeOrder = mongoose.Schema({
    orderedProducts: [{
        id: String,
        productName: String,
        category: String,
        brand: String,
        color: String,
        quantity: Number,
        weight: Number,
        price: Number,
        count: Number,
        expandedPrice: Number,
    }],
    personalDetails: {
        PersonalName: String,
        PersonalEmail: String,
        PersonalPhoneNo: Number,
    },
    shippingAddress: {
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: Number,
        address: String,
        district: String,
        state: String,
        pincode: Number,
        country: String,
    },
    billingAddress: {
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: Number,
        address: String,
        district: String,
        state: String,
        pincode: Number,
        country: String,
    },
    totalPrice: Number,
}, {
    timestamps: true
})
// module.exports = mongoose.model('orders',placeOrder);
const orders = mongoose.model('orders', placeOrder);
export default orders;