const gql = require('graphql-tag');

const typeDefs = gql` #graphql
    type admins{
        _id: ID,
        email: String,
        password: String,
    }

    input adminsInput{
        name: String,
        email:String,
        password:String
    }

    type Query{
        getAllUsers:[admins]
    }

    type Mutation{
        createAdmin(adminsInput:adminsInput):admins!
    }
`
module.exports = typeDefs;