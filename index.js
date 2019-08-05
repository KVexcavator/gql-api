const {
  ApolloServer
} = require("apollo-server-express");
const express = require("express");
// npm install graphql-playground-middleware-express
const expressPlayground = require('graphql-playground-middleware-express').default;
const {
  readFileSync
} = require('fs');
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');
const {
  MongoClient
} = require('mongodb');
require('dotenv').config();


async function start() {
  const app = express();
  const MONGO_DB = process.env.DB_HOST;

  const client = await MongoClient.connect(
    MONGO_DB, {
      useNewUrlParser: true
    }
  );

  const db = client.db();

  const context = {
    db
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  server.applyMiddleware({
    app
  });

  app.get("/", (req, res) => res.end("Welcome to the GraphQL API!"));
  app.get('/playground', expressPlayground({
    endpoint: '/graphql'
  }));

  app.listen({
      port: 4000
    }, () =>
    console.log(
      `GraphQL Server running at http://localhost:4000{server.graphqlPath}`
    )
  );
}

start();

const requestGithubToken = credentials =>
  fetch(
    'https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'applycation/json'
      },
      body: JSON.stringify(credentials)
    }
  )
  .then(res => res.json())
  .catch(error => {
    throw new Error(JSON.stringify(error))
  });

const requestGithubUserAccount = token =>
  fetch('https://api.github.com/user?access_token=${token}')
  .then(toJSON)
  .catch(throwError);

async function authorizeWithGithub(credentials) {
  const {
    access_token
  } = await requestGithubToken(credentials);
  const githubUser = await requestGithubUserAccount(access_token)
  return {
    ...githubUser,
    access_token
  };
}