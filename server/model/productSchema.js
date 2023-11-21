const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const productSchema = mongoose.Schema({
    id: ObjectId,
    // image: Object,
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
// module.exports = mongoose.model('admins', adminSchema);
module.exports = mongoose.model('products', productSchema)