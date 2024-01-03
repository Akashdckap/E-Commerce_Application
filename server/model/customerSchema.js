import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name:String,
    email:String,
    phoneNo:Number,
    password:String,
},{
    timestamps:true
});

const customerDetails = mongoose.model('customerRegister',customerSchema);

export default customerDetails;