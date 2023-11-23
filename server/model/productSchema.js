const mongoose = require('mongoose');

const newProduct = mongoose.Schema({
    image: String,
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

module.exports = mongoose.model('products', newProduct);
