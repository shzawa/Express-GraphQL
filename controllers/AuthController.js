const User = require('../schema/models/user')
const bcrypt = require('bcrypt')
const func = require('../schema/mutation/func')

exports.store = (req, res) => {}

exports.login = async (req, res) => {
  // バリデーションチェック
  if (!req.body.email) return res.status(400).send({
    message: 'Must be valid email.'
  })
  if (!req.body.password) return res.status(400).send({
    message: 'Must be valid password.'
  })

  // emailでUser検索
  await User.exists({
      email: req.body.email
    })
    .then(isExists => {
      if (!isExists) return res.status(401).send({
        message: 'Invalid email.'
      })
    })

  const foundUser = await User.findOne({
      email: req.body.email
    })
    .lean()
    .exec()

  // ログインパスワードチェック
  await bcrypt.compare(req.body.password, foundUser.password)
    .then(isLogin => {
      if (!isLogin) return res.status(401).send({
        message: 'Login failed.'
      })
    })

  // ログイン成功
  const updateUser = {
    ...foundUser,
    hash_id: func.getUniqueStr() // サロゲートキーのみ更新
  }

  await User.updateOne({
    _id: updateUser._id
  }, updateUser)

  return res.status(200)
    .header({
      uid: updateUser.hash_id
    })
    .send(updateUser)
}
