const newUser = require('../model/login');
const order = require('../model/order');
const product = require('../model/product');
const resolvers = {
    // Query: {
    //     getAllUsers: async () => {
    //         return await (users.find({}));
    //     },
    //     getUserTasks: async () => {
    //         return await (userTask.find({}));
    //     },
    //     getAdminOrManagers: async () => {
    //         return await (adminOrManager.find({}));
    //     }
    // },
    // Mutation: {
    //     async createUsers(_, { usersInput: { name, email, password } }) {
    //         const newUsers = new users({
    //             name: name,
    //             email: email,
    //             password: password
    //         })
    //         const res = await newUsers.save();

    //         return{
    //             ...res._doc
    //         }
    //     },

    //     async createTasks(_,{newTasks:{taskName,description,status,userId,addedBy}}){
    //         const newOne = new userTask({
    //             taskName:taskName,
    //             description:description,
    //             status:status,
    //             userId:userId,
    //             addedBy:addedBy
    //         })
    //         const res = await newOne.save();
    //         return{
    //             ...res._doc
    //         }
    //     },

    //     async createAdminOrManagers(_,{newEmployee:{name,role,email,password,userId}}){
    //         const newEmployee = new adminOrManager({
    //             name:name,
    //             role:role,
    //             email:email,
    //             password:password,
    //             userId:userId
    //         })
    //         const res = await newEmployee.save();
    //         return{
    //             ...res._doc
    //         }
    //     }
    // }
}
module.exports = resolvers;