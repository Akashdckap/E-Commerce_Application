// const mongoose = require('mongoose');
import mongoose from "mongoose";
// mongoose.set('strictQuery', true);
// const ObjectId = mongoose.Types.ObjectId
const placeOrder = mongoose.Schema({
    orderedProducts: [{
        productName: String,
        productID: String,
        description: String,
        category: String,
        brand: String,
        color: String,
        weight: Number,
        price: Number,
        quantity: Number,
        expandedPrice: Number,
    }],
    personalDetails: {
        name: String,
        email: String,
        phoneNo: Number,
        customerId: String,
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
