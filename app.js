'use strict'

// 環境変数読み込み
require('dotenv').config()
const env = process.env

// DB起動
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${env.MNG_DBHOST}:${env.MNG_PORT}/${env.MNG_DBNAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  console.log('db connected')
})
mongoose.set('useFindAndModify', false) // 参考: https://mongoosejs.com/docs/deprecations.html

// Webサーバ起動
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')

// body-parser有効化
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(express.text({
  type: 'application/graphql'
}))

app.use(cors())
app.use('/', router)

app.listen(env.EXP_PORT, () => {
  console.log(`実行中 http://localhost:${env.EXP_PORT}`)
})
