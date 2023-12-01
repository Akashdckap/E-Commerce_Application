// const mongoose = require('mongoose');
import mongoose from "mongoose";

const newProduct = mongoose.Schema({
    productName: String,
    category: String,
    brand: String,
    price: Number,
    weight: Number,
    color: String,
    description: String
}, {
    timestamps: true
});

// module.exports = mongoose.model('products', newProduct);
const productSchema = mongoose.model('products',newProduct);
export default productSchema;
