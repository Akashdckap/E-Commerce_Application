import mongoose from "mongoose";
const shippingAddressAndRegisterSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phoneNo: Number,
        password: String,
        Addresses: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: mongoose.Types.ObjectId,
            },
            firstName: String,
            lastName: String,
            email: String,
            phoneNo: Number,
            address: String,
            district: String,
            state: String,
            pincode: Number,
            country: String,
        }]
    },
    {
        timestamps: true,
    }
);


const customerDetails = mongoose.model('customerRegister', shippingAddressAndRegisterSchema);

export default customerDetails;