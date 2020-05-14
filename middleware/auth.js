const User = require('../schema/models/user')

module.exports.isAuthorized = async (req, res, next) => {
  const goBack = () => {
    return res.status(401).send({
      message: 'Not authorized! Go back!'
    })
  }

  if (!req.headers.uid) return goBack()

  User.findOne({
      hash_id: req.headers.uid
    })
    .exec((err, user) => {
      if (err) return next(err)
      if (user === null) return goBack()
      return next()
    })
}
