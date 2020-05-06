const {
  GraphQLSchema
} = require('graphql')
const rootQuery = require('./query')
const rootMutation = require('./mutation')

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
})
