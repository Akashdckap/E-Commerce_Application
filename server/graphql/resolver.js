// const { default: GraphQLUpload } = require('graphql-upload/GraphQLUpload.js');
// const Upload = import('graphql-upload/Upload.mjs');
// const path = require('path')
// const fs = require('fs')
// const mongoose = require("mongoose");
import admins from '../model/adminSchema.js';
import productDetails from '../model/productSchema.js';
import newOrders from '../model/order.js';
import customerInformation from '../model/customerSchema.js';

// import Upload from 'graphql-upload/Upload.mjs';
// import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
// const {GraphQLUpload}  = require('graphql-upload/GraphQLUpload.js')
import path from 'path';
import bcrypt from 'bcrypt';
import fileSchema from '../model/fileSchema.js'
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
const resolvers = {
    // Upload: GraphQLUpload,
    Query: {
        getCustomerRegister: async () => {
            return await (customerInformation.find({}));
        },
        getAllAdmins: async () => {
            return await (admins.find({}));
        },
        getEditProductData: async (_, { id }) => {
            return await productDetails.findOne({ _id: new ObjectId(id) })
        },
        getProductDetails: async (_, { id }) => {
            return await productDetails.findOne({ _id: new ObjectId(id) })
        },

        getAllProductsData: async () => {
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

        addToCartProductData: async (_, { ids }) => {
            if (!ObjectId.isValid(ids)) {
                throw new Error('Invalid ObjectId format');
            }
            try {
                const data = await productDetails.findById(ids)
                return data
            }
            catch (error) {
                console.log(error, "Error fetching data from mongodb");
            }
        },
        getOrderProductDetails: async (_, { id }) => {
            const order = await newOrders.findOne({ _id: new ObjectId(id) })
            return order;
        },
        getAllOrderDatas: async (_, { page, pageSize }) => {
            const skip = (page - 1) * pageSize;
            const orderDatas = await (newOrders.find({}).skip(skip).limit(pageSize));
            const formattedOrders = orderDatas.map(order => {
                return {
                    ...order._doc,
                    OrderTime: order.createdAt.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }),
                };
            });
            return formattedOrders;
        },

        getOrderCount: async () => {
            const orderCount = await newOrders.countDocuments();
            return orderCount;
        },
    },
    Mutation: {
        async newCustomer(_, { customerInput }) {
            const hashPassword = await bcrypt.hash(customerInput.password, 10)
            const customer = new customerInformation({
                name: customerInput.name,
                email: customerInput.email,
                phoneNo: customerInput.phoneNo,
                password: hashPassword
            });
            const details = await customer.save();
            return details
        },
        async customerLogin(_, { loginInput }) {
            const check = await customerInformation.find({ email: loginInput.email });
            if (check.length > 0) {
                const comparePassword = bcrypt.compare(loginInput.password, check[0].password);
                if (comparePassword == true) {
                    console.log("password matched");
                }
                else {
                    console.log("password not matched");
                }
            }
            else{
                console.log("email not matched")
            }
        },
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

        async createOrders(_, { inputs }) {
            try {
                const expandedAmountarray = inputs.orderedProducts.map((expanded) => expanded.expandedPrice)
                const totalPrice = expandedAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                //    if(!inputs || inputs.orderedProducts || inputs.orderedProducts.length === 0){
                //     throw new Error("Invalid input. Ensure 'orderedProducts' is provided and not empty.");

                //    }
                // console.log("totalExpandedAmount--------------", totalExpandedAmount);
                // const totalPrice = inputs.orderedProducts.reduce((accumulator, products) => {
                //     return accumulator + (products.price * products.expandedPrice);
                // }, 0)
                // const { orderedProducts, personalDetails, shippingAddress, billingAddress } = inputs;
                // const totalPrice = orderedProducts.reduce((acc,cuu)=> acc + cuu.price,0)
                const order = new newOrders({
                    orderedProducts: inputs.orderedProducts,
                    personalDetails: inputs.personalDetails,
                    shippingAddress: inputs.shippingAddress,
                    billingAddress: inputs.billingAddress,
                    totalPrice,
                })
                // const orders = new newOrders(input);
                const saveOrders = await order.save();
                // console.log(saveOrders);
                return saveOrders

            }
            catch (err) {
                console.log(err, "create orders error");
                throw new Error("Failed to create order");
            }
        }
    }
}

// module.exports = resolvers;
// const hello = require('../../Client/public/Images')
export default resolvers;