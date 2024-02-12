// const fastify = require('fastify');
// const mongoose = require('mongoose');
// const fastifyCORS = require('@fastify/cors');
// const fastifyMultipart = require('@fastify/multipart');
// const bodyParser = require('body-parser');
// const fastifySensible = require('fastify-sensible');
// const processRequest = import('graphql-upload/processRequest.mjs');
// const { ApolloServer } = require('@apollo/server');
// const { default: fastifyApollo, fastifyApolloDrainPlugin } = require('@as-integrations/fastify');
import fastify from 'fastify';
import mongoose from 'mongoose';
import fastifyCORS from '@fastify/cors';
// import fastifyMultipart from '@fastify/multipart';
// import processRequest from 'graphql-upload/processRequest.mjs';
import { ApolloServer } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify';
// const { processRequest } = require('graphql-upload/processRequest.js')
// import processRequest from "graphql-upload/processRequest.js";

const app = fastify();
const PORT = 5000;
// app.register(fastifySensible);

// const router = require('./controller/router');
// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolver');
import router from './controller/router.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolver.js';

app.register(router, { prefix: '/admin' });
app.addContentTypeParser("multipart", (request, payload, done) => {
  request.isMultipart = true;
  done();
});

// Format the request body to follow graphql-upload's
app.addHook("preValidation", async function (request, reply) {
  if (!request.isMultipart) {
    return;
  }

  request.body = await processRequest(request.raw, reply.raw);
});

async function server() {
  // app.register(fastifyMultipart);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(app)],
    includeStacktraceInErrorResponses: true,
  });
  await apolloServer.start();
  app.register(fastifyApollo(apolloServer), { path: '/e-commerce' }); //If we need to change route use { path: '/users' }
  app.register(fastifyCORS, {
    origin: ['http://localhost:3001'],
    methods: ["POST", "GET"],
    credentials: true,
  })
  // app1.register(fastifyMultipart);
  // app1.register(graphqlUploadFastify())
}

app.register(server);
// app.register(apolloServer.createHandler());

mongoose.connect('mongodb://localhost:27017/E-commerce').then(() => { console.log("Connected with MongoDB") }).catch((err) => { console.log("Not connected", err) });

app.listen({ port: PORT }).then(() => console.log(`Your port running on the ${PORT}`)).catch((error) => console.log("Your connection is not okay", error));

