'use strict'

// 環境変数読み込み
require('dotenv').config()
const env = process.env

// DB起動
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/${env.MNG_DBNAME}`)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

// Webサーバ起動
const express = require('express')
const app = express()
const router = require('./router')

app.use('/', router)

app.listen(4000, () => {
  console.log('実行中 http://localhost:4000')
})
