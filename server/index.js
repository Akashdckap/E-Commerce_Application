const fastify = require('fastify');
const mongoose = require('mongoose');
const fastifyCORS = require('@fastify/cors');
// const bodyParser = require('body-parser');
// const fastifySensible = require('fastify-sensible');
const { ApolloServer } = require('@apollo/server');

const { default: fastifyApollo, fastifyApolloDrainPlugin } = require('@as-integrations/fastify');
const app = fastify();
const PORT = 4000;
// app.register(fastifySensible);

const router = require('./controller/router');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolver');
app.register(router, { prefix: '/admin' });

async function server(app1) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(app)],
  });
  await apolloServer.start();
  app1.register(fastifyApollo(apolloServer)); //If we need to change route use { path: '/users' }
  app1.register(fastifyCORS, {
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET"],
    credentials: true,
  })
}

app.register(server);
// app.register(apolloServer.createHandler());


mongoose.connect('mongodb://localhost:27017/E-commerce').then(() => { console.log("Connected with MongoDB") }).catch((err) => { console.log("Not connected") });

app.listen({ port: PORT }).then(() => console.log(`Your port running on the ${PORT}`)).catch((error) => console.log("Your connection is not okay",error));