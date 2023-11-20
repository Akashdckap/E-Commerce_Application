const gql = require('graphql-tag');

const typeDefs = gql` #graphql
    type admins{
        _id: ID,
        email: String,
        password: String,
    }
    
    type orders{
        _id: ID,
        productId: ID,
        quantity: String,
        name: String,
        email: String,
        phoneNo: Number,
        address: String,
        district: String,
        state: String,
        pincode: Number
    }

    type products{
        _id: ID,
        name: String,
        brand: String,
        color: String,
        size: Number,
        weight: Number,
        price: Number,
        description: String
    }

    input adminsInput{
        email:String,
        password:String
    }

    input ordersInput{
        productId: ID,
        quantity: Number,
        name: String,
        email: String,
        phoneNo: Number,
        address: String,
        district: String,
        state: String,
        pincode: Number
    }

    input productsInput{
        name: String,
        brand: String,
        color: String,
        size: Number,
        weight: Number,
        price: Number,
        description: String
    }

    type Query{
        getAllAdmins:[admins]
        getAllOrders:[orders]
        getAllProducts:[products]
    }

    type Mutation{
        createadmins(adminsInput:adminsInput):admins!
        createorders(newOrders:ordersInput):orders!
        createproducts(newProducts:productsInput):products!
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