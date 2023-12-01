import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: String,
    data: Buffer,
},{
    timestamps:true
})

const image = mongoose.model('images',fileSchema);

export default image;