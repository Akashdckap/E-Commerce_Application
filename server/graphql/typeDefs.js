// const gql = require('graphql-tag');
import gql from "graphql-tag";

const typeDefs = gql` #graphql

    scalar Upload
    scalar Date
    scalar BigInt

    type admins{
        _id: ID!,
        email: String!,
        password: String!,
    }
    type customerRegister{
        _id: ID!
        name: String,
        email: String,
        phoneNo: BigInt,
        password: String,
    }
    type customerLogin{
        email:String,
        password: String,
    }
    type products{
        _id: ID,
        productName: String,
        category: String,
        brand: String,
        price: Int
        weight: Int,
        description: String,
        color: String,
    }

    type images{
        filename: String,
        data: String,
    }

    input adminsInput{
        email:String!,
        password:String!,
    }

    input orderProductInput{
        productID: String!,
        productName: String!,
        description: String!,
        category: String!,
        brand: String!,
        color: String!,
        weight: Int!,
        price: Int!,
        count: Int!,
        expandedPrice: Int!,
    }
    input personalDetailsInput{
        name: String!,
        email: String!,
        phoneNo: BigInt!,
        customerId: String,
    }
    input shippingAddressInput{
        firstName: String!,
        lastName: String!,
        email: String!,
        phoneNo: String!,
        address: String!,
        district: String!,
        state: String!,
        pincode: String!,
        country: String!, 
    }
    input billingAddressInput{
        firstName: String!,
        lastName: String!,
        email: String!,
        phoneNo: String!,
        address: String!,
        district: String!,
        state: String!,
        pincode: String!,
        country: String!,   
    }

    # input totalPriceInput{
    #     totalPrice: Int,
    # }

    input orderedInput{
        orderedProducts:[orderProductInput!]!,
        personalDetails: personalDetailsInput!,
        shippingAddress: shippingAddressInput!,
        billingAddress: billingAddressInput!,
        # totalPrice: totalPriceInput!
        # totalPrice: Float!
    }

    input productsInput{
        productName: String,
        category:String,
        brand: String,
        price: String,
        weight: String,
        color: String,
        description: String,
    }

    type orderProduct{
        productName: String,
        productID: String,
        description: String,
        category: String,
        brand: String,
        color: String,
        weight: Int,
        price: Int,
        count: Int,
        expandedPrice: Int,
    }

    type personalDetails{
        name: String,
        email: String,
        phoneNo: BigInt,
        customerId: String,
    }

    type shippingAddress{
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: String,
        address: String,
        district: String,
        state: String,
        pincode: String,
        country: String, 
    }

    type billingAddress{
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: String,
        address: String,
        district: String,
        state: String,
        pincode: String,
        country: String, 
    }

    type orders{
        _id: ID!,
        orderedProducts: [orderProduct]!,
        personalDetails: personalDetails!,
        shippingAddress: shippingAddress!,
        billingAddress: billingAddress!,
        OrderTime: Date,
        totalPrice: Int,
    }
    input customerRegisterInput{
        name: String,
        email:String,
        phoneNo: BigInt,
        password: String,
    }
    input customerLoginInput{
        email: String,
        password: String,
    }
    input updateProductInput{
        productName: String,
        category:String,
        brand: String,
        price: String,
        weight: String,
        color: String,
        description: String,
    }
    input updateCustomerPersonal {
        name: String,
        email: String,
        phoneNo: BigInt,
    }
    type productPageNation{
        products: [products!]!,
        totalCount:Int!
    }  
    input upDateCartPrice{
        expandedPrice: Int,
        totalPrice: Int,
    }
    type cartItems{
        productId: String,
        productName: String,
        category: String,
        brand: String,
        price: Int,
        weight: Int,
        color: String,
        description: String,
    }
    type cart{
        userId: ID!,
        cartItems:[cartItems]!
    }

    input cartItemsInput{
        productId: String,
        productName: String,
        category: String,
        brand: String,
        price: Int,
        weight: Int,
        color: String,
        description: String,
    }
    input File{
        url: String!
    }

    type loginResponse {
        email: String,
        password: String,
        token: String,
    }
    type Query{
        getCustomerRegister(id: ID!): customerRegister
        getShippingAddress(id: ID!): shippingAddress
        getAllAdmins:[admins]
        getAllProductsData: [products]
        getAllProducts(page:Int!,pageSize:Int!):[products!]!
        getTotalProductCount:Int!
        getEditProductData(id: ID!): products
        getProductDetails(id: ID!):products
        addToCartProductData(ids: ID!): products
        getOrderCount: Int!
        getOrderProductDetails(id: ID!): orders!
        getAllOrderDatas(page:Int!,pageSize:Int!): [orders]!
        getAddToCart(userId: ID!):cart!
    }

    type Mutation{
        registerCustomer(customerInput: customerRegisterInput):customerRegister!
        customerLogin(loginInput: customerLoginInput): loginResponse!
        createAdmins(adminsInput: adminsInput): admins!
        createProducts(newProducts: productsInput): products!
        deleteProduct(id: ID!) : Boolean!
        updateProduct(id: ID!, input: updateProductInput): products!
        createOrders(inputs: orderedInput): orders!

        cartItems(userId:ID!, productId:ID! productCart: cartItemsInput): cartItems!
        updatePrice(id: ID, input:upDateCartPrice): cartItems!
        uploadFile(file: Upload!): String!
        updateCustomerPersonalDetails(id: ID!, input: updateCustomerPersonal) : customerRegister
        addCustomerShippingAddress(id: ID!, input: shippingAddressInput) : shippingAddress
        updateCustomerShippingAddress(id: ID!, input: shippingAddressInput) : shippingAddress
    }
`
export default typeDefs;