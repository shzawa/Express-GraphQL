'use strict'

// 環境変数読み込み
require('dotenv').config()
const env = process.env

// DB起動
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${env.MNG_DBHOST}:${env.MNG_PORT}/${env.MNG_DBNAME}`)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

// Webサーバ起動
const express = require('express')
const app = express()
const router = require('./router')

app.use('/', router)

app.listen(env.EXP_PORT, () => {
  console.log(`実行中 http://localhost:${env.EXP_PORT}`)
})
