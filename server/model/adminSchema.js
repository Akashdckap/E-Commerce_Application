const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const adminSchema = mongoose.Schema({
    id: ObjectId,
    email: String,
    password: String,
}, {
    timestamps: true
});
module.exports = mongoose.model('admins', adminSchema);
