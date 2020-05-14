// Controller読み込み
const AuthController = require('../controllers/AuthController')
const GraphiQLController = require('../controllers/GraphQLController')

const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

router.use('/graphql', GraphiQLController)
router.post('/api/v1/auth/sign_up', AuthController.store)
router.post('/api/v1/auth/sign_in', AuthController.login)

express.application.prefix = express.Router.prefix = (path, middleware, configure) => {
  configure(router)
  router.use(path, middleware, router)
  return router
}

router.prefix('/api/v1/guarded', auth.isAuthorized, async (user) => {
  user.route('/').get(function (req, res) {
    res.status(201).send('Hello this is my personal details')
  })
})

module.exports = router
