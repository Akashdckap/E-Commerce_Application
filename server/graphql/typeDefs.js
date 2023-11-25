const gql = require('graphql-tag');

const typeDefs = gql` #graphql

    # scalar Upload 
    scalar Upload
    
    type admins{
        _id: ID!,
        email: String!,
        password: String!,
    }
    
    type orders{
        _id: ID,
        productId: ID,
        quantity: String,
        name: String,
        email: String,
        phoneNo: Int,
        address: String,
        district: String,
        state: String,
        pincode: Int
    }

    type products{
        _id: ID,
        productName: String,
        category: String,
        brand: String,
        price: Int
        weight: Int,
        description: String
        color: String,
    }

    input adminsInput{
        email:String!,
        password:String!
    }

    input ordersInput{
        productId: ID,
        quantity: Int,
        name: String,
        email: String,
        phoneNo: Int,
        address: String,
        district: String,
        state: String,
        pincode: Int
    }

    input productsInput{
        productName: String,
        category:String,
        brand: String,
        price: String,
        weight: String,
        color: String,
        description: String
    }
    input updateProductInput{
        productName: String,
        category:String,
        brand: String,
        price: String,
        weight: String,
        color: String,
        description: String
    }

    type Query{
        getAllAdmins:[admins]
        getAllOrders:[orders]
        getAllProducts: [products]
        getEditProductData(id: ID!): products
        getProductDetails(id: ID!):products
        getAddToCart_Single_ProductData(id: ID!): products
        # uploads: [File]
        # hello: String!
    }

    input File{
        url: String!
    }


    type Mutation{
        createAdmins(adminsInput: adminsInput): admins!
        createProducts(newProducts: productsInput): products!
        createOrders(newOrders: ordersInput): orders!
        singleUpload(file: File): Upload!
        deleteProduct(id: ID!) : Boolean!
        updateProduct(id: ID!, input: updateProductInput): products!
        uploadFile(file: Upload!): String!
    }
`
module.exports = typeDefs;