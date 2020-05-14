// Controller読み込み
const AuthController = require('../controllers/AuthController')
const GraphiQLController = require('../controllers/GraphQLController')

const express = require('express')
const router = express.Router()

router.use('/graphql', GraphiQLController)
router.post('/api/v1/auth/sign_up', AuthController.store)
router.post('/api/v1/auth/sign_in', AuthController.login)

module.exports = router
