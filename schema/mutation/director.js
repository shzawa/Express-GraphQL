const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const Director = require('../models/director')
const DirectorType = require('../types/director')

module.exports = {
  addDirector: {
    type: DirectorType,
    args: {
      name: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      }
    },
    resolve(parent, args) {
      const director = new Director({
        name: args.name,
        age: args.age
      })
      return director.save()
    }
  },
  updateDirector: {
    type: DirectorType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID)
      },
      name: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      }
    },
    resolve(parent, args) {
      let updateDirector = {}
      args.name && (updateDirector.name = args.name)
      args.age && (updateDirector.age = args.age)
      return Director.findByIdAndUpdate(args.id, updateDirector, {
        new: true // 変更後の値をキャッチ
      })
    }
  },
  deleteDirector: {
    type: DirectorType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID)
      },
    },
    resolve(parent, args) {
      return Director.findByIdAndRemove(args.id)
    }
  }
}
