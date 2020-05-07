const {
  GraphQLObjectType,
} = require('graphql')

// データ変更方法
module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...require('./movie'),
    ...require('./director'),
    ...require('./user'),
  }
})
