const {
  GraphQLID,
  GraphQLList,
} = require('graphql')

const Director = require('../models/director')
const DirectorType = require('../types/director')

module.exports = {
  director: {
    type: DirectorType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve(_, args) {
      return Director.findById(args.id)
    }
  },
  directors: {
    type: new GraphQLList(DirectorType),
    resolve(_, args) {
      return Director.find({})
    }
  }
}
