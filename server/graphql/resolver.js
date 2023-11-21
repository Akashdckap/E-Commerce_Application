
const { ApolloError } = require('apollo-server-fastify');
const admins = require('../model/adminSchema');
const productDeatails = require('../model/productSchema')
// const order = require('../model/order');
// const product = require('../model/product');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const resolvers = {
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
        }
    },
    Mutation: {
        async createAdmins(_, { adminsInput: { email, password } }) {
            const newUsers = new admins({
                email: email,
                password: password
            })
            const emailList = await admins.find({})
            const verifyEmail = emailList.some((emails) => { return emails.email === newUsers.email })
            if (verifyEmail) {
                throw new ApolloError("successfully")
            }
            else {
                throw new ApolloError("Invalid Email")
            }
            // })
            // if(verifyEmail.find())
            // emailList.find((email) => console.log(email))
            // console.log(verifyEmail);
            // if (verifyEmail()) {
            //     throw new ApolloError("Succefully logged")
            // }
            // else {
            //     throw new ApolloError("Invalid email")
            // }
            // console.log(emailList.find((email) => email.email === newUsers.email))
            // console.log(list);

            // if (verifyEmail) {
            //     // const res = await newUsers.save();
            //     throw new ApolloError("Succefully logged")
            //     // console.log("Succefully logged")
            // }
            // else {
            //     // console.log("Invalid email")
            //     throw new ApolloError("Invalid email")
            // }
            // console.log(getAdminEmail);

            // return {
            //     ...res._doc
            // }
        },

        async createOrders(_, { newOrders: { productId, quantity, name, email, phoneNo, address, district, state, pincode } }) {
            const newOne = new order({
                productId: ObjectId(productId),
                quantity: quantity,
                name: name,
                email: email,
                phoneNo: phoneNo,
                address: address,
                district: district,
                state: state,
                pincode: pincode
            })
            const res = await newOne.save();
            return {
                ...res._doc
            }
        },

        async createProducts(_, { newProducts: { productName, category, brand, price, weight, color, description } }) {
            const newProduct = new productDeatails({
                // image: image,
                productName: productName,
                category: category,
                brand: brand,
                price: price,
                weight: weight,
                color: color,
                description: description
            })
            console.log(newProduct);
            const res = await newProduct.save();
            return {
                ...res._doc
            }
        }
    }
}
module.exports = resolvers;