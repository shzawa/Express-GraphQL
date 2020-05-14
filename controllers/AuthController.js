const User = require('../schema/models/user')
const bcrypt = require('bcrypt')
const func = require('../schema/mutation/func')

exports.store = async (req, res) => {
  // バリデーションチェック
  if (!req.body.name) return res.status(400).send({
    message: 'Name is required.'
  })
  if (!req.body.email) return res.status(400).send({
    message: 'Email is required.'
  })
  if (!req.body.password) return res.status(400).send({
    message: 'Password is required.'
  })

  // emailとnameの重複チェック
  await User.exists({
      $or: [{
          email: req.body.email
        },
        {
          name: req.body.name
        }
      ]
    })
    .then(isExists => {
      if (isExists) return res.status(400).send({
        message: 'That name or email has been used.'
      })
    })

  const user = await new User({
    hash_id: func.getUniqueStr(),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })

  await user.save()

  return res.status(200)
    .header({
      uid: user.hash_id
    })
    .send(user)
}

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
