const gql = require('graphql-tag');

const typeDefs = gql` #graphql
    type users{
        _id: ID,
        name: String,
        email: String,
        password: String,
    }
    
    type usertasks{
        _id: ID,
        taskName: String,
        description: String,
        status: String,
        userId: ID,
        addedBy: ID
    }

    type adminOrManagers{
        _id: ID,
        name: String,
        role: String,
        email: String,
        password: String,
        userId: [String]
    }

    input usersInput{
        name: String,
        email:String,
        password:String
    }

    input usertasksInput{
        taskName: String,
        description: String,
        status: String,
        userId: ID,
        addedBy: ID
    }

    input adminOrManagersInput{
        name: String,
        role: String,
        email: String,
        password: String,
        userId: [String]
    }

    type Query{

        getAllUsers:[users]
        getUserTasks:[usertasks]
        getAdminOrManagers:[adminOrManagers]
    }

    type Mutation{
        createUsers(usersInput:usersInput):users!
        createTasks(newTasks:usertasksInput):usertasks!
        createAdminOrManagers(newEmployee:adminOrManagersInput):adminOrManagers!
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