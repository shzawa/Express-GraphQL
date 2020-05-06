// Controller読み込み
const AuthController = require('../controllers/AuthController')
const GraphiQLController = require('../controllers/GraphQLController')

const express = require('express')
const router = express.Router()

router.get('/', AuthController.test)
router.use('/graphql', GraphiQLController)

module.exports = router
