const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    id:ObjectId,
    name:String,
    email:String,
    password:String,
},{
    timestamps:true
});
module.exports = mongoose.model('users',userSchema);
