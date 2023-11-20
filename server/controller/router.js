

const adminSchema = require('../model/adminSchema')
const Routes = (fastify, options, done) => {

    fastify.post('/adminLogin', async (request, response) => {
        let formData = {
            email: request.body.email,
            password: request.body.password
        };
        const getUser = new adminSchema(formData);
        const success = await getUser.save();
        response.send({ Status: "Success" });
    })
    done();
}

module.exports = Routes;