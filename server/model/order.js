// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const ObjectId = mongoose.Types.ObjectId
const placeOrder = mongoose.Schema({
    orderedProducts: [{
        productName: String,
        category: String,
        brand: String,
        color: String,
        quantity: Number,
        price: Number,
        product_id: mongoose.Schema.Types.ObjectId,
    }],
    personalDetails: {
        name: String,
        email: String,
        phoneNo: Number,
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
},
    {
        timestamps: true
    }
)
// module.exports = mongoose.model('orders',placeOrder);
const orders = mongoose.model('orders', placeOrder);
export default orders;