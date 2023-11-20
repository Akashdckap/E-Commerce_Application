const admins = require('../model/adminSchema')
const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await (admins.find({}));
        },
    },
    Mutation: {
        async createAdmin(_, { adminsInput: {email, password } }) {
            const newAdmins = new admins({
                email: email,
                password: password
            })
            const res = await newAdmins.save();

            return{
                ...res._doc
            }
        },
    }
}
module.exports = resolvers;