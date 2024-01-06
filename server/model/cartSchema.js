import mongoose from 'mongoose';

const cartProducts = mongoose.Schema({
    productName: String,
    quantity: Number,
    category: String,
    brand: String,
    price: Number,
    weight: Number,
    color: String,
    description: String,
    expandedPrice: Number,
    totalPrice: Number,
},
    {
        timeStamps: true
    }
);

const productCart = mongoose.model('cartItems', cartProducts);

export default productCart;