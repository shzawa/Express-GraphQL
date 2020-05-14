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

const whitelist = ['http://localhost:8080']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use('/', cors(corsOptions), router)

app.listen(env.EXP_PORT, () => {
  console.log(`実行中 http://localhost:${env.EXP_PORT}`)
})
