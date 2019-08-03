const {
  ApolloServer
} = require("apollo-server-express");
const express = require("express");
// npm install graphql-playground-middleware-express
const expressPlayground = require('graphql-playground-middleware-express').default;



var _id = 0;
var users = [{
    githubLogin: "IvanDurov",
    name: "Izya Groisman"
  },
  {
    githubLogin: "MrTwister",
    name: "Abram Abramov"
  },
  {
    githubLogin: "MamkeyMan",
    name: "Alex Ogurcov"
  }
];
var photos = [{
    id: "1",
    name: "First",
    description: "Lorem upsum something",
    category: "ACTION",
    githubUser: "IvanDurov",
    created: "10-19-1971"
  },
  {
    id: "2",
    name: "Second",
    category: "SELFIE",
    githubUser: "MamkeyMan",
    created: "5-9-2001"
  },
  {
    id: "3",
    name: "The end",
    description: "I and my treasures",
    category: "LANDSCAPE",
    githubUser: "MrTwister",
    created: "2-05-2019"
  }
];
var tags = [{
    photoID: "1",
    userID: "MrTwister"
  },
  {
    photoID: "2",
    userID: "MamkeyMan"
  },
  {
    photoID: "2",
    userID: "IvanDurov"
  },
  {
    photoID: "2",
    userID: "MrTwister"
  }
];

var app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({
  app
});

app.get("/", (req, res) => res.end("Welcome to the GraphQL API!"));

app.listen({
    port: 4000
  }, () =>
  console.log(
    `GraphQL Server running @ http://localhost:4000{server.graphqlPath}`
  )
);

app.get('/playground', expressPlayground({
  endpoint: '/graphql'
}));