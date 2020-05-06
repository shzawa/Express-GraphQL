const {
  graphql
} = require('graphql')
const schema = require('../schema')

exports.test = (req, res) => {
  let ret = []
  graphql(schema, "{ movies { id name } }")
    .then(response => {
      ret = response.data.movies[0]
      console.log(ret.id)
      res.json({
        id: ret.id
      })
    })
}
