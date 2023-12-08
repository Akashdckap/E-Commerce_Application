// const admins = require('../model/adminSchema');
// const productDetails = require('../model/productSchema')
// const { default: GraphQLUpload } = require('graphql-upload/GraphQLUpload.js');
// const Upload = import('graphql-upload/Upload.mjs');
// const path = require('path')
// const fs = require('fs')
// const mongoose = require("mongoose");
import admins from '../model/adminSchema.js';
import productDetails from '../model/productSchema.js';
// import Upload from 'graphql-upload/Upload.mjs';
// import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
// const {GraphQLUpload}  = require('graphql-upload/GraphQLUpload.js')
import path from 'path';
import fileSchema from '../model/fileSchema.js'
import fs, { createReadStream, createWriteStream } from 'fs';
import mongoose from 'mongoose';
import { promises } from 'dns';

const ObjectId = mongoose.Types.ObjectId;
const resolvers = {
    // Upload: GraphQLUpload,
    Query: {
        getAllAdmins: async () => {
            return await (admins.find({}));
        },
        getAllOrders: async () => {
            return await (order.find({}));
        },
        getEditProductData: async (_, { id }) => {
            return await productDetails.findOne({ _id: new ObjectId(id) })
        },
        getProductDetails: async (_, { id }) => {
            return await productDetails.findOne({ _id: new ObjectId(id) })
        },
        getAllProductsData: async () => {
            // const da = await (productDetails.find({}));
            // console.log(da);
            return await (productDetails.find({}))
        },
        getAllProducts: async (_, { page, pageSize }) => {

            const skip = (page - 1) * pageSize;
            const products = await (productDetails.find({}).skip(skip).limit(pageSize));
            return products;
        },
        getTotalProductCount: async () => {
            const totalCount = await productDetails.countDocuments();
            return totalCount;
        },
        getAddToCart_Single_ProductData: async (_, { id }) => {
            return await productDetails.findOne({ _id: new ObjectId(id) })
            // console.log(ids);
            // const getIds = ids.map(id => new ObjectId(id));
            // const items = await collection.find({ _id: { $in: getIds } })
            // return items
        }
    },
    Mutation: {
        async createAdmins(_, { adminsInput: { email, password } }) {
            const newUsers = new admins({
                email: email,
                password: password
            });
            const emailList = await admins.find({ email: newUsers.email });
            if (emailList) {
                if (emailList[0].password == newUsers.password) {
                    throw new Error("Successfully")
                }
                else {
                    throw new Error("Incorrect Password")
                }
            }
            else {
                throw new Error("Email Id not exists");
            }
        },
        async createProducts(_, { newProducts: { productName, category, brand, price, weight, color, description } }) {
            const newProduct = new productDetails({
                productName: productName,
                category: category,
                brand: brand,
                price: price,
                weight: weight,
                color: color,
                description: description
            })
            const res = await newProduct.save();
            return {
                ...res._doc
            }
        },
        async deleteProduct(parent, { id }) {
            try {
                const result = await productDetails.deleteOne({ _id: new ObjectId(id) });
                return result
            }
            catch (error) {
                console.error(error);
                return false;
            }
        },
        async updateProduct(_, { id, input }) {
            try {
                const updatedProduct = await productDetails.findByIdAndUpdate(
                    id,
                    input,
                    { new: true }
                )
                if (!updatedProduct) {
                    throw new Error('Product not found');
                }
                return updatedProduct
            }
            catch (error) {
                console.error('Error updating product:', error);
                throw new Error('Failed to update product');
            }
        },
        async uploadFile(_, { file }) {
            try {
                const { createReadStream, filename } = await file;
                const stream = createReadStream();
                const __dirname = path.dirname(new URL(import.meta.url).pathname)
                const pathName = path.join(__dirname, `../../Client/public/Images`, filename);
                // await stream.pipe(fs.createWriteStream(pathName))
                // return {
                //     url: `http://localhost:4000/Images/${filename}`
                // }
                const writeStream = fs.createWriteStream(pathName);
                await new Promise((resolve, reject) => {
                    stream
                        .pipe(writeStream)
                        .on('finish', resolve)
                        .on('error', reject);
                });
                // console.log(pathName)
                const buffer = fs.readFileSync(pathName);

                const fileDocument = new fileSchema({ filename, data: buffer });
                await fileDocument.save();

                fs.unlinkSync(pathName);

                return (`file ${filename} uploaded Successfully`)
                // return { success:true, message: `Image upload successfully`};
            }
            catch (error) {
                console.log("catch error----------------", error);
                throw new Error('Failed to upload File');
                // return {success:false, message: 'Failed to upload image'}
            }

        },

    }
}

// module.exports = resolvers;
// const hello = require('../../Client/public/Images')
export default resolvers;