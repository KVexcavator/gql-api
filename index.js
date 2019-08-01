const {
  ApolloServer
} = require('apollo-server')

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
`
const resolvers = {
  Query: {
    totalPhotos: () => 54
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({
    url
  }) => console.log(`GraphQL servise running on ${url}`))