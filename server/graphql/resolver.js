// const { default: GraphQLUpload } = require('graphql-upload/GraphQLUpload.js');
// const Upload = import('graphql-upload/Upload.mjs');
// const path = require('path')
// const fs = require('fs')
// const mongoose = require("mongoose");
// const { ApolloError } = require('apollo-server');
// import { ApolloError } from 'apollo-server';
import admins from '../model/adminSchema.js';
import productDetails from '../model/productSchema.js';
import newOrders from '../model/order.js';
import customerInformation from '../model/customerSchema.js';
import cartSchema from '../model/cartSchema.js';
// import Upload from 'graphql-upload/Upload.mjs';
// import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
// const {GraphQLUpload}  = require('graphql-upload/GraphQLUpload.js')
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fileSchema from '../model/fileSchema.js'
import mongoose from 'mongoose';
import { error } from 'console';
// import { ApolloError } from 'apollo-server-fastify';

const ObjectId = mongoose.Types.ObjectId;

const resolvers = {
    // Upload: GraphQLUpload,
    Query: {
        getCustomerRegister: async (_, { id }) => {
            return await (customerInformation.findOne({ _id: new ObjectId(id) }));
        },
        getShippingAddress: async (_, { userId, editAddressId }) => {
            const getAddress = await (customerInformation.findOne({ "_id": new ObjectId(userId), "Addresses._id": new ObjectId(editAddressId) }));
            return getAddress
            // console.log(getAddress)
        },
        getCustomerCartData: async (_, { userId }) => {
            const cartData = await cartSchema.findOne({ userId: new mongoose.Types.ObjectId(userId) })
            return cartData.cartItems
        },
        getCustomerOrders: async (_, { userId }) => {
            const customerOrders = await newOrders.find(
                { _id: new ObjectId(userId) },
                { orderedProducts: 1, totalPrice: 1, createdAt: 1, billingAddress: 1, shippingAddress: 1 }
            );
            const formatTime = customerOrders.map((orderValue) => {
                const { createdAt, ...rest } = orderValue._doc;
                return {
                    ...rest,
                    orderTime: new Date(createdAt).toLocaleString('en-US', {
                        month: "short",
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })
                }
            })
            // console.log("order-----------",formatTime)
            return formatTime
        },
        getCustomerPersonalDetails: async (_, { userId, page, pageSize }) => {
            // console.log(page, "-------page")
            // console.log(pageSize, "-------pageSize")
            const skip = (page - 1) * pageSize;
            const personDetails = await newOrders.find(
                { "personalDetails.customerId": userId },
                { "personalDetails": 1, totalPrice: 1, createdAt: 1 }
            ).skip(skip).limit(pageSize)
            const formatCreateTime = personDetails.map((orderPersonal) => {
                const { createdAt, ...rest } = orderPersonal._doc
                return {
                    ...rest,
                    orderTime: new Date(createdAt).toLocaleString('en-US', {
                        month: "short",
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })
                }
            });
            // console.log(formatCreateTime);
            return formatCreateTime;
            // const customerTotalPrice = await newOrders.findOne({ "totalPrice": new mongoose.Types.ObjectId(userId) })
            // return customerOrders.orderedProducts;
            // return (customerOrders.totalPrice, customerOrders.totalPrice)
            // console.log("customerOrders-------------", customerOrders);
        },
        getGuestOrders: async (_, { page, pageSize }) => {
            try {
                const skip = (page - 1) * pageSize;
                const guestOrders = await newOrders.find(
                    { "personalDetails.customerId": '' },
                    {
                        personalDetails: 1,
                        _id: 1,
                        totalPrice: 1,
                        createdAt: 1,
                    }
                ).skip(skip).limit(pageSize)
                const formatCreateTime = guestOrders.map((guestOrder) => {
                    const { createdAt, ...rest } = guestOrder._doc
                    return {
                        ...rest,
                        orderTime: new Date(createdAt).toLocaleString('en-US', {
                            month: "short",
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })
                    }
                });
                return formatCreateTime
            }
            catch (error) {
                console.error('Error fetching guest orders:', error);
                throw new Error('Error fetching guest orders');
            }

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
            // const formattedUpdatedAt = allOrders.map(order => ({
            //     ...order._doc,
            //     OrderTime: order.updatedAt.toLocaleString('en-US', {
            //         month: 'short',
            //         day: 'numeric',
            //         hour: 'numeric',
            //         minute: 'numeric',
            //         hour12: true,
            //     }),
            // }));
            // // console.log("formattedOrders-------------",formattedOrders);
            // return formattedUpdatedAt;
        },
        getAllProducts: async (_, { page, pageSize }) => {
            try {
                const skip = (page - 1) * pageSize;
                const products = await (productDetails.find({}).skip(skip).limit(pageSize));
                return products;
            }
            catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("An error occurred while fetching products.");
            }
        },
        getTotalProductCount: async () => {
            const totalCount = await productDetails.countDocuments();
            return totalCount;
        },
        getCustomerOrderCount: async (_, { userId }) => {
            try {
                const orderCustomerCount = await newOrders.countDocuments({ "personalDetails.customerId": userId });
                return orderCustomerCount
            }
            catch (error) {
                console.error("Error counting orders:", error);
            }
        },
        getGuestOrderCount: async () => {
            try {
                const orderGuestCount = await newOrders.countDocuments({ "personalDetails.customerId": "" });
                return orderGuestCount
            }
            catch (error) {
                console.error("Error counting orders:", error);
            }
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
            try {
                const skip = (page - 1) * pageSize;
                const orderDatas = await newOrders.find({}).skip(skip).limit(pageSize);
                const formattedOrders = orderDatas.map(order => ({
                    ...order._doc,
                    OrderTime: order.createdAt.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }),
                }));
                // console.log("formattedOrders-------------",formattedOrders);
                const orderCount = await newOrders.countDocuments();
                // console.log(orderCount)
                return { formattedOrders, orderCount }
            }
            catch (error) {
                console.error("Error fetching all orders:", error);
                throw new Error("An error occurred while fetching all orders.");
            }
        },


        getOrderCount: async () => {
            const orderCount = await newOrders.countDocuments();
            return orderCount;
        },
        getAddToCart: async (_, { userId }) => {
            try {
                const cart = await cartSchema.findOne({ userId })
                return cart;
            }
            catch (error) {
                console.log(error, "Not getting the cartItems back")
            }
        }
    },

    Mutation: {
        singleUpload: async (_, { file }) => {
            // return { file }
            // const { createReadStream, filename, mimetype, encoding } = await file;
            // console.log("filename-----------", file);
        },

        async registerCustomer(_, { customerInput }) {
            const emailExists = await customerInformation.find({ email: customerInput.email })
            const hashPassword = await bcrypt.hash(customerInput.password, 10)
            if (emailExists.length < 1) {
                const customer = new customerInformation({
                    name: customerInput.name,
                    email: customerInput.email,
                    phoneNo: customerInput.phoneNo,
                    password: hashPassword
                });
                const details = await customer.save();
                return details
            }
            else {
                throw new Error("Email id already exists");
            }
        },
        async updateCustomerPersonalDetails(_, { id, input }) {
            try {
                const updatedCustomerPersonal = await customerInformation.findByIdAndUpdate(
                    id,
                    input,
                    { new: true }
                )
                if (!updatedCustomerPersonal) {
                    throw new Error('Customer not found');
                }
                return updatedCustomerPersonal
            }
            catch (error) {
                console.error('Error updating Customer personal details:', error);
                throw new Error('Failed to update Customer details');
            }
        },
        async addCustomerShippingAddress(_, { id, input }) {
            const objectId = new ObjectId(id);
            try {
                const customerId = await customerInformation.findOne({ _id: objectId });
                if (!customerId) {
                    throw new Error('Customer not found');
                }
                customerId.Addresses.push(input);
                await customerId.save();
                return customerId.shippingAddress
            }
            catch (error) {
                console.error('Error updating customer address:', error);
                throw new Error('Failed to update customer address');
            }
        },
        async updateCustomerShippingAddress(_, { userId, addressId, input }) {
            try {
                const updatedCustomerShipping = await customerInformation.findById(userId)

                if (updatedCustomerShipping) {
                    const result = await customerInformation.updateOne({ _id: new ObjectId(userId), "Addresses": { $elemMatch: { "_id": new ObjectId(addressId) } } }, { $set: { "Addresses.$": input } })
                    if (result.modifiedCount > 0) true
                    else false
                }

                return await updatedCustomerShipping.save()
            }
            catch (error) {
                console.error('Error updating Customer shippingAddress:', error);
                throw new Error('Failed to update Customer shippingAddress');
            }
        },
        async customerLogin(_, { loginInput }) {
            const check = await customerInformation.find({ email: loginInput.email });
            if (check.length > 0) {
                const comparePassword = await bcrypt.compare(loginInput.password, check[0].password);
                if (comparePassword) {
                    const name = check[0].name;
                    const customerId = check[0]._id;
                    const token = jwt.sign({ name, customerId }, "secret-key", { expiresIn: '1d' })
                    return { token };
                }
                else {
                    throw new Error("Password is not correct");
                }
            }
            else {
                throw new Error("Email is not registered");
            }
        },
        async createAdmins(_, { adminsInput }) {
            const newUsers = new admins({
                name: adminsInput.name,
                email: adminsInput.email,
                phoneNo: adminsInput.phoneNo,
                password: adminsInput.password,
            });

            const emailList = await admins.find({ email: newUsers.email });
            try {
                if (emailList.length == 0) {
                    const saveAdmin = await newUsers.save();
                    return saveAdmin
                }
            }
            catch (error) {
                throw new Error("Already registered")
                // console.log(error)
            }
        },
        async loginAdmins(_, { adminsLogin }) {
            const check = await admins.findOne({ email: adminsLogin.email });
            if (check == null) {
                throw new Error("Admin with the provided email not found");
            }
            else {
                if (check.password == adminsLogin.password) {
                    return true;
                }
                else {
                    throw new Error("Wrong Password")
                }
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
        async deleteProduct(_, { id }) {
            try {
                await productDetails.deleteOne({ _id: new ObjectId(id) });
                return true
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
                const writeStream = fs.createWriteStream(pathName);
                await new Promise((resolve, reject) => {
                    stream
                        .pipe(writeStream)
                        .on('finish', resolve)
                        .on('error', reject);
                });
                const buffer = fs.readFileSync(pathName);

                const fileDocument = new fileSchema({ filename, data: buffer });
                await fileDocument.save();

                fs.unlinkSync(pathName);

                return (`file ${filename} uploaded Successfully`)
            }
            catch (error) {
                console.log("catch error----------------", error);
                throw new Error('Failed to upload File');
            }

        },

        async createOrders(_, { inputs }) {
            try {
                const expandedAmountarray = inputs.orderedProducts.map((expanded) => expanded.expandedPrice)
                const totalPrice = expandedAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

                const order = new newOrders({
                    orderedProducts: inputs.orderedProducts,
                    personalDetails: inputs.personalDetails,
                    shippingAddress: inputs.shippingAddress,
                    billingAddress: inputs.billingAddress,
                    totalPrice,
                })
                const saveOrders = await order.save();
                const { customerId } = inputs.personalDetails;
                if (customerId) {
                    await cartSchema.deleteOne({ userId: inputs.personalDetails.customerId });
                }
                return saveOrders
            }
            catch (err) {
                console.log(err, "create orders error");
                throw new Error("Failed to create order");
            }
        },

        async cartItems(_, { userId, productId, productCart }) {
            // console.log("productCart-------", productCart);
            // console.log("userId-------", userId);
            // console.log("productId-------", productId);
            try {
                const cart = await cartSchema.findOne({ userId })
                if (!cart) {
                    const saveCart = new cartSchema({
                        userId,
                        cartItems: { quantity: 1, expandedPrice: productCart.price, ...productCart },
                    })
                    await saveCart.save();
                    cart = saveCart
                    return cart;
                }
                else {
                    const existingItem = cart.cartItems.find((item) => new ObjectId(item.productID).toString() === new ObjectId(productId).toString());
                    if (existingItem) {
                        existingItem.quantity = existingItem.quantity + 1;
                        existingItem.expandedPrice = existingItem.quantity * productCart.price;
                        await cartSchema.updateOne(
                            {
                                userId,
                                'cartItems.productID': existingItem.productID,
                            },
                            {
                                $set: {
                                    'cartItems.$.quantity': existingItem.quantity,
                                    'cartItems.$.expandedPrice': existingItem.expandedPrice,
                                },
                            },
                        )
                        return existingItem
                    } else {
                        cart.cartItems.push({ quantity: 1, expandedPrice: productCart.price, ...productCart });
                    }
                    await cart.save();
                    return cart.cartItems;
                }
                return cart.cartItems;
            }
            catch (error) {
                console.log("error not storing the cart data", error)
            }


        },
        async deleteCustomerCartData(_, { userId, cartId }) {
            try {
                const result = await cartSchema.updateOne(
                    { userId: ObjectId(userId) },
                    { $pull: { cartItems: { _id: ObjectId(cartId) } } }
                );
                if (result.modifiedCount > 0) return true
                return false
            }
            catch (error) {
                console.error(error);
                return false;
            }
        },

        async deleteCustomerAddress(_, { userId, addressId }) {
            try {
                const result = await customerInformation.updateOne(
                    { _id: userId },
                    { $pull: { Addresses: { _id: addressId } } }
                );
                if (result.modifiedCount > 0) return true
                else return false
            }
            catch (error) {
                console.error(error)
                return false
            }
        },
        async deleteAllCustomerCartData(_, { userId }) {
            try {
                const removeAllData = await cartSchema.updateOne(
                    { userId: ObjectId(userId) },
                    { $set: { cartItems: [] } }
                )
                if (removeAllData.modifiedCount > 0) return true
                return false
            }
            catch (error) {
                console.log(error);
            }
        },
        async incrementCustomerProductQty(_, { productId, userId }) {
            try {
                const cart = await cartSchema.findOne({ userId })
                const getSpecific = cart.cartItems.find((item) => item._id.toString() === new ObjectId(productId).toString());
                if (getSpecific) {
                    getSpecific.quantity = getSpecific.quantity + 1;
                    getSpecific.expandedPrice = getSpecific.price * getSpecific.quantity;
                    await cart.save();
                    return getSpecific;
                } else {
                    console.log('Product not found in the cart.');
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        async decrementCustomerProductQty(_, { productId, userId }) {
            try {
                const cart = await cartSchema.findOne({ userId })
                const getSpecific = cart.cartItems.find((item) => item._id.toString() === new ObjectId(productId).toString());
                if (getSpecific.quantity <= 1) {
                    // throw new Error("Decreasing the default value")
                    console.log("Decreasing the default value")
                } else {
                    getSpecific.quantity = getSpecific.quantity - 1;
                    getSpecific.expandedPrice = getSpecific.price * getSpecific.quantity;
                    await cart.save();
                    return getSpecific;
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        async updatePrice(_, { id, input }) {
            const updatePrice = new cartItems({
                expandedPrice: input.expandedPrice,
                totalPrice: input.totalPrice,
            })
            const currentValue = await cartItems.findByIdAndUpdate(id, updatePrice, { new: true });
            return currentValue;
        }

    }
}

// module.exports = resolvers;
// const hello = require('../../Client/public/Images')
export default resolvers;