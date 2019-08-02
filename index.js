const { ApolloServer } = require("apollo-server");

const typeDefs = `
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
    name: "Dropping the Heart Chute",
    description: "Lorem upsum something",
    category: "ACTION",
    githubUser: "IvanDurov"
  },
  {
    id: "2",
    name: "Enjoying the banana",
    category: "SELFIE",
    githubUser: "MamkeyMan"
  },
  {
    id: "3",
    name: "Gunbarrel 25",
    description: "I and my treasures",
    category: "LANDSCAPE",
    githubUser: "MrTwister"
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
        ...args.input
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
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL servise running on ${url}`));
