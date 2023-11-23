
// const { ApolloError } = require('@apollo/server');
const admins = require('../model/adminSchema');
const productDeatails = require('../model/productSchema')

// const order = require('../model/order');
// const product = require('../model/product');
// const { GraphQLUpload} = require('graphql-upload')
const path = require('path')
const fs = require('fs')
const mongoose = require("mongoose");
// const { GraphQLUpload, processRequest } = require('graphql-upload')
// const { GraphQLUpload } = require('graphql-upload')
// const { GraphQLUpload } = require('graphql-upload')
// const {GraphQL}
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
            // return productList
            // console.log(productList);
        },
        // uploads:async ()=>{

        // }
        hello: () => "Hello world from bala"
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

        // async createOrders(_, { newOrders: { productId, quantity, name, email, phoneNo, address, district, state, pincode } }) {
        //     const newOne = new order({
        //         productId: ObjectId(productId),
        //         quantity: quantity,
        //         name: name,
        //         email: email,
        //         phoneNo: phoneNo,
        //         address: address,
        //         district: district,
        //         state: state,
        //         pincode: pincode
        //     })
        //     const res = await newOne.save();
        //     return {
        //         ...res._doc
        //     }
        // },

        // async createProducts(_, { newProducts: { productName, category, brand, price, weight, description, color } }) {

        //     const newProduct = new product({
        //         productName: productName,
        //         category: category,
        //         brand: brand,
        //         price: price,
        //         weight: weight,
        //         color: color,
        //         description: description
        //     })

        //     // console.log(newProduct);
        //     if (newProduct) {
        //         const res = await newProduct.save();
        //         throw new Error("Successfully");
        //     }
        //     else {
        //         throw new Error("Not added");
        //     }
        //     // console.log(res);
        //     // return {
        //     //     ...res._doc
        //     // }

        // }

        // createProducts: async (_, { file }) => {
        //     const { newProducts, filename } = await file;
        //     const stream = newProducts();
        //     const uploadPath = path.join(__dirname, '../../Client/public/images', filename);
        //     await new Promise((resolve, reject) => {

        //     })
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
            // console.log(newProduct);
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
        // }
    }
}
module.exports = resolvers;