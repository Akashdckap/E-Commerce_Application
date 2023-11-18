const mongoose = require('mongoose');

const newProduct = mongoose.Schema({
    name:String,
    brand:String,
    color:String,
    size:String,
    weight:Number,    
    quantity:String,
    price:Number,
    description:String,
},{
    timestamps:true
});

module.exports = mongoose.model('products',newProduct);