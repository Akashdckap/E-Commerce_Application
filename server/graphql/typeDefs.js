// const gql = require('graphql-tag');
import gql from "graphql-tag";

const typeDefs = gql` #graphql

    scalar Upload
    
    type admins{
        _id: ID!,
        email: String!,
        password: String!,
    }
    
    # type orders{
    #     _id: ID,
    #     productId: ID,
    #     quantity: String,
    #     name: String,
    #     email: String,
    #     phoneNo: Int,
    #     address: String,
    #     district: String,
    #     state: String,
    #     pincode: Int
    # }

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
        productName: String,
        quantity: Int,
        price:Int,
    }
    input personalDetailsInput{
        name: String,
        email: String,
        phoneNo: Int,
    }
    input shippingAddressInput{
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: Int,
        address: String,
        district: String,
        state: String,
        pincode: Int,
        country: String,   
    }
    input billingAddressInput{
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: Int,
        address: String,
        district: String,
        state: String,
        pincode: Int,
        country: String,   
    }

    input orderedInput{
        orderedProducts:[orderProductInput!]!,
        personalDetails: personalDetailsInput!,
        shippingAddress: shippingAddressInput!,
        billingAddress: billingAddressInput!,
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
        quantity: Int,
        price:Int,
    }
    type personalDetails{
        name: String,
        email: String,
        phoneNo: Int,
    }
    type shippingAddress{
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: Int,
        address: String,
        district: String,
        state: String,
        pincode: Int,
        country: String, 
    }
    type billingAddress{
        firstName: String,
        lastName: String,
        email: String,
        phoneNo: Int,
        address: String,
        district: String,
        state: String,
        pincode: Int,
        country: String, 
    }

    type orders{
        orderedProducts:[orderProduct],
        personalDetails:personalDetails,
        shippingAddress:shippingAddress,
        billingAddress:billingAddress,
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
    type productPageNation{
        products: [products!]!,
        totalCount:Int!
    }  

    input File{
        url: String!
    }

    type Query{
        getAllAdmins:[admins]
        # getAllOrders:[orders]
        getAllProductsData: [products]
        getAllProducts(page:Int!,pageSize:Int!):[products!]!
        getTotalProductCount:Int!
        getEditProductData(id: ID!): products
        getProductDetails(id: ID!):products
        # addToCartProductData(ids: [ID!]!): [products]!
        addToCartProductData(ids: ID!): products
        # getImages:[images]
    }

    type Mutation{
        createAdmins(adminsInput: adminsInput): admins!
        createProducts(newProducts: productsInput): products!
        # createOrders(newOrders: ordersInput): orders!
        deleteProduct(id: ID!) : Boolean!
        updateProduct(id: ID!, input: updateProductInput): products!
        uploadFile(file: Upload!): String!
        # insertOrders(orderedProducts:[ordersInput!]!,personalDetails: personalDetails!,shippingAddress: shippingAddress!,billingAddress: billingAddress!):orders!
        createOrders(input: orderedInput!): orders!
    }
`
// module.exports = typeDefs;

export default typeDefs;