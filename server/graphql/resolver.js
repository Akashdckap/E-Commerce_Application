const admins = require('../model/login');
const order = require('../model/order');
const product = require('../model/product');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const { graphqlError } = require('graphql')
const { ApolloError } = require('@apollo/server');

const resolvers = {
    Query: {
        getAllAdmins: async () => {
            return await (admins.find({}));
        },
        getAllOrders: async () => {
            return await (order.find({}));
        },
        getAllProducts: async () => {
            return await (product.find({}));
        }
    },
    Mutation: {
        async createAdmins(_, { adminsInput: { email, password } }) {
            const newUsers = new admins({
                email: email,
                password: password
            })
            // console.log(newUsers.email)
            // async (req, res) => {
            const adminList = await admins.find({ email: newUsers.email });
            if (adminList.length > 0) {
                return {
                    ...adminList._doc
                }
            }
            else {
                throw new ApolloError(message, {
                    extensions: { code: 'not exists' },
                });
            }
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

        async createProducts(_, { newProducts: { name, brand, color, size, weight, price, description } }) {
            const newProduct = new product({
                name: name,
                brand: brand,
                color: color,
                size: size,
                weight: weight,
                price: price,
                description: description
            })
            const res = await newProduct.save();
            return {
                ...res._doc
            }
        }
    }
}
module.exports = resolvers;