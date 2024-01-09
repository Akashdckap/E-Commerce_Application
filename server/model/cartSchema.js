import mongoose from 'mongoose';

const cartProducts = mongoose.Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        cartItems: [{
            productId: mongoose.Schema.Types.ObjectId,
            productName: String,
            quantity: Number,
            category: String,
            brand: String,
            price: Number,
            weight: Number,
            color: String,
            description: String,
            expandedPrice: Number,
        }]
    },
    {
        timeStamps: true
    }
    
);

const productCart = mongoose.model('cartItems', cartProducts);

export default productCart;