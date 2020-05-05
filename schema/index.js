const {
  GraphQLSchema
} = require('graphql')

module.exports = new GraphQLSchema({
  query: new require('./query'),
  mutation: new require('./mutation')
})
