
// const { ApolloError } = require('@apollo/server');
const admins = require('../model/adminSchema');
const productDeatails = require('../model/productSchema')
// const order = require('../model/order');
// const product = require('../model/product');
// const { GraphQLUpload } = require('graphql-upload');
// const { finished } = require('stream/promises')
const path = require('path')
const fs = require('fs')
const mongoose = require("mongoose");
// const { promises } = require('dns');

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
        getAllProducts: async () => {
            return await (productDeatails.find({}));
        },
        getEditProductData: async (_, { id }) => {
            return await productDeatails.findOne({ _id: new ObjectId(id) })
        }
    },
    Mutation: {
        async createAdmins(_, { adminsInput: { email, password } }) {
            const newUsers = new admins({
                email: email,
                password: password
            })
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
            const newProduct = new productDeatails({
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
                const result = await productDeatails.deleteOne({ _id: new ObjectId(id) });
                return result.deleteCount > 0;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        },
        async updateProduct(_, { id, input }) {
            try {
                const updatedProduct = await productDeatails.findByIdAndUpdate(
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
        async uploadFile(parent, { file }) {
            console.log(file);
            const { createReadStream, filename, mimetype, encoding } = await file
            const stream = createReadStream()
            const pathName = path.join(__dirname, `/public/Images/${filename}`)
            await stream.pipe(fs.createWriteStream(pathName))
            // console.log(url);
            // console.log(filename);
            return {
                url: `http://localhost:4000/Images/${filename}`
            }


        }
    }
}
module.exports = resolvers;