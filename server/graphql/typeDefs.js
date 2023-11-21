const gql = require('graphql-tag');

const typeDefs = gql` #graphql
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
        image: String,
        productName: String,
        category:String,
        brand: String,
        price: Int,
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
        image: String,
        productName: String,
        category:String,
        brand: String,
        price: Int,
        weight: Int,
        description: String
        color: String,
    }

    type Query{
        getAllAdmins:[admins]
        getAllOrders:[orders]
        getAllProducts:[products]
    }

    type Mutation{
        createAdmins(adminsInput: adminsInput): [admins]
        createOrders(newOrders: ordersInput): orders!
        createProducts(newProducts: productsInput): products!
    }
`
// const typeDefsPart2 = gql`
//     type usertasks{
//         _id : ID,
//         taskName : String,
//         description : String,
//         status : String,
//     }

//     type Query{
//         getUsersTasks:[usersTasks]
//     }
// `

// const typeDefs = gql`
//     ${typeDefsPart1}
//     ${typeDefsPart2}
// `


module.exports = typeDefs;