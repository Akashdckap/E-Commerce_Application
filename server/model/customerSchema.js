import mongoose from "mongoose";
const shippingAddressSchema = mongoose.Schema({
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
    _id: false,
});

const customerSchema = mongoose.Schema({
    name: String,
    email: String,
    phoneNo: Number,
    password: String,
    shippingAddress: shippingAddressSchema,
},
    {
        timestamps: true
    });

const customerDetails = mongoose.model('customerRegister', customerSchema);

export default customerDetails;