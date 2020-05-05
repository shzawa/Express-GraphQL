'use strict'

require('dotenv').config()
const env = process.env

const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema')
const app = express()


mongoose.connect(`mongodb+srv://${env.MNG_USER}:${env.MNG_PASSWORD}@cluster0-ldjgt.mongodb.net/${env.MNG_DBNAME}?retryWrites=true&w=majority`)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('実行中 http://localhost:4000')
})
