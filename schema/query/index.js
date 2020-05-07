const {
  GraphQLObjectType,
} = require('graphql')

// データ抽出方法
module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...require('./movie'),
    ...require('./director'),
    ...require('./user')
  }
})
