// const mongoose = require('mongoose');
import mongoose from "mongoose";
mongoose.set('strictQuery', true);
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
        count: Number,
        expandedPrice: Number,
    }],
    personalDetails: {
        PersonalName: String,
        PersonalEmail: String,
        PersonalPhoneNo: String,
    },
    shippingAddress: {
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: String,
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
        phoneNo: String,
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
// const orderedProductSchema = new Schema({
// productName: String,
// description: String,
// category: String,
// brand: String,
// color: String,
// weight: Number,
// price: Number,
// count: Number,
// expandedPrice: Number,
// });

// const personalDetailsSchema = new Schema({
//     PersonalName: String,
//     PersonalEmail: String,
//     PersonalPhoneNo: String,
// });

// const addressSchema = new Schema({
//     firstName: String,
//     lastName: String,
//     email: String,
//     phoneNo: String,
//     address: String,
//     district: String,
//     state: String,
//     pincode: String,
//     country: String,
// });

// const createdOrderSchema = new Schema({
//     orderedProducts: [orderedProductSchema],
//     personalDetails: personalDetailsSchema,
//     shippingAddress: addressSchema,
//     billingAddress: addressSchema,
// });

// const CreatedOrderModel = mongoose.model('orders', createdOrderSchema);

// module.exports =  CreatedOrderModel 