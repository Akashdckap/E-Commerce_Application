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
        productName: String,
        category:String,
        brand: String,
        color: String,
        quantity: Int,
        price:Int,
        product_id: ID,
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
        productName: String,
        category: String,
        brand: String,
        color: String,
        quantity: Int,
        price:Int,
        product_id: ID,
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
        getAllOrders:[orders!]!
        # getImages:[images]
    }

    type Mutation{
        createAdmins(adminsInput: adminsInput): admins!
        createProducts(newProducts: productsInput): products!
        deleteProduct(id: ID!) : Boolean!
        updateProduct(id: ID!, input: updateProductInput): products!
        uploadFile(file: Upload!): String!
        createOrders(input: orderedInput): orders!
    }
`
// module.exports = typeDefs;

export default typeDefs;