const userSchema = require("../model/login");
// const usersTasks = require("../model/order");

const Routes = (fastify, options, done) => {
    fastify.get('/', async (request, reply) => {
        const users = await userSchema.find({});
        // console.log(users);
        reply.send({ users: users })
    })
    // fastify.get('/usersTasks', async (req, res) => {
    //     const tasks = await usersTasks.find({});
    //     res.send({ tasks: tasks })
    // })
    // fastify.post('/userRegister',async(request,response)=>{
    //     let formData = {
    //         name:request.body.name,
    //         email:request.body.email,
    //         password:request.body.password
    //     };
    //     const getUser = new userSchema(formData);
    //     const success = await getUser.save();
    //     response.send({Status:"Success"});
    // })
    done();
}

// const { fastifyApolloHandler } = require('@as-integrations/fastify');
// const fastify = require('fastify');

// const Routes = (fastify, options, done) => {
//     fastify.get("/api", fastifyApolloHandler(fastify));
//     fastify.route({
//         url: "/graphql",
//         method: ["POST", "OPTIONS"],
//         handler: fastifyApolloHandler(apollo),
//     })

//     done();
// }
module.exports = Routes;