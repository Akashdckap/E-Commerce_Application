const admins = require('../model/login');
const order = require('../model/order');
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
            return await (product.find({}));
        }
    },
    Mutation: {
        async createAdmins(_, { adminsInput: { email, password } }) {
            const newUsers = new order({
                email: email,
                password: password
            })
            const res = await newUsers.save();

            return{
                ...res._doc
            }
        },

        async createOrders(_,{newOrders:{productId,quantity,name,email,phoneNo,address,district,state,pincode}}){
            const newOne = new order({
                productId:ObjectId(productId),
                quantity:quantity,
                name:name,
                email:email,
                phoneNo:phoneNo,
                address:address,
                district:district,
                state:state,
                pincode:pincode
            })
            const res = await newOne.save();
            return{
                ...res._doc
            }
        },

        async createProducts(_,{newProdusts:{name,brand,color,size,weight,price,description}}){
            const newProduct = new product({
                name:name,
                role:role,
                email:email,
                password:password,
                userId:userId
            })
            const res = await newProduct.save();
            return{
                ...res._doc
            }
        }
    }
}
module.exports = resolvers;