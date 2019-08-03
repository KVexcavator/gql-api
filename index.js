const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { GraphQLScalarType } = require("graphql");

const typeDefs = `
  scalar DateTime
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
  }
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    taggedUsers: [User!]!
    created: DateTime
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }
  input PostPhotoInput {
    name: String!
    category: PhotoCategory = PORTRAIT
    description: String
  }
  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
  }
`;
var _id = 0;
var users = [
  {
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
var photos = [
  {
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
var tags = [
  { photoID: "1", userID: "MrTwister" },
  { photoID: "2", userID: "MamkeyMan" },
  { photoID: "2", userID: "IvanDurov" },
  { photoID: "2", userID: "MrTwister" }
];
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto(parent, args) {
      var newPhoto = {
        id: _id++,
        ...args.input,
        created: new Date()
      };
      photos.push(newPhoto);
      return newPhoto;
    }
  },
  Photo: {
    url: parent => `http://yousete.com/img/${parent.id}.jpg`,
    postedBy: parent => {
      return users.find(u => u.githubLogin === parent.githubUser);
    },
    taggedUsers: parent =>
      tags
        .filter(tag => tag.photoID === parent.id)
        .map(tag => tag.userID)
        .map(userID => users.find(u => u.githubLogin === userID))
  },
  User: {
    postedPhotos: parent => {
      return photos.filter(p => p.githubUser === parent.githubLogin);
    },
    inPhotos: parent =>
      tags
        .filter(tag => tag.userID === parent.id)
        .map(tag => tag.photoID)
        .map(photoID => photos.find(p => p.id === photoID))
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value",
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value || null
  })
};

var app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.get("/", (req, res) => res.end("Welcome to the GraphQL API!"));

app.listen({ port: 4000 }, () =>
  console.log(
    `GraphQL Server running @ http://localhost:4000{server.graphqlPath}`
  )
);
