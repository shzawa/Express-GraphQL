const {
  graphql
} = require('graphql')
const schema = require('../schema')

exports.test = (req, res) => {
  let ret = []
  const query = `
  {
    movies {
      id name
    }
  }
  `

  graphql(schema, query)
    .then(response => {
      ret = response.data.movies[0]
      console.log(ret.name)
      res.json({
        name: ret.name
      })
    })
}
