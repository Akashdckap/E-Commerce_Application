
// const { ApolloError } = require('@apollo/server');
const admins = require('../model/login');
// const order = require('../model/order');
const product = require('../model/product');
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

        async createProducts(_, { newProducts: { image, productName,category, brand, price, weight, description, color } }) {
            const newProduct = new product({
                image: image,
                productName: productName,
                category: category,
                brand: brand,
                price: price,
                weight: weight,
                color: color,
                description: description
            })

            // console.log(newProduct);
            if (newProduct) {
                const res = await newProduct.save();
                throw new Error("Successfully");
            }
            else {
                throw new Error("Not added");
            }
            // console.log(res);
            // return {
            //     ...res._doc
            // }

        }
    }
}
module.exports = resolvers;