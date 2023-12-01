

// const adminSchema = require('../model/adminSchema')
import adminSchema from '../model/adminSchema.js'
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
// const routes = Routes;
export default Routes;