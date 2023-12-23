// const gql = require('graphql-tag');
import gql from "graphql-tag";

const typeDefs = gql` #graphql

    scalar Upload
    
    type admins{
        _id: ID!,
        email: String!,
        password: String!,
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
        _id: ID,
        productName: String,
        category:String,
        brand: String,
        color: String,
        quantity: Int,
        weight:Int,
        price: Int,
        count: Int,
        expandedPrice: Int,
    }
    input personalDetailsInput{
        PersonalName: String,
        PersonalEmail: String,
        PersonalPhoneNo: String,
    }
    input shippingAddressInput{
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
    input billingAddressInput{
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

    # input totalPriceInput{
    #     totalPrice: Int,
    # }

    input orderedInput{
        orderedProducts: [orderProductInput],
        personalDetails: personalDetailsInput,
        shippingAddress: shippingAddressInput,
        billingAddress: billingAddressInput,
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
        _id: String,
        productName: String,
        category: String,
        brand: String,
        color: String,
        quantity: Int,
        weight:Int,
        price: Int,
        count: Int,
        expandedPrice: String,
    }

    type personalDetails{
        PersonalName: String,
        PersonalEmail: String,
        PersonalPhoneNo: Int,
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

    # type totalPrice{
    #     totalPrice: Int,
    # }

    type orders{
        orderedProducts:[orderProduct],
        personalDetails:personalDetails,
        shippingAddress:shippingAddress,
        billingAddress:billingAddress,
        # totalPrice: Float,
        # totalPrice:totalPrice,
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
        getAllProductsData: [products]
        getAllProducts(page:Int!,pageSize:Int!):[products!]!
        getTotalProductCount:Int!
        getEditProductData(id: ID!): products
        getProductDetails(id: ID!):products
        addToCartProductData(ids: ID!): products
        getAllOrders:[orders]!
        # getImages:[images]
    }

    type Mutation{
        createAdmins(adminsInput: adminsInput): admins!
        createProducts(newProducts: productsInput): products!
        deleteProduct(id: ID!) : Boolean!
        updateProduct(id: ID!, input: updateProductInput): products!
        createOrders(inputs: orderedInput): orders!
        uploadFile(file: Upload!): String!
    }
`
// module.exports = typeDefs;

export default typeDefs;