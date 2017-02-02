import path from 'path'
import koa from 'koa'
import serve from 'koa-static'

const debug = require('debug')('ow:main')
const app = koa()

app.use(serve(path.resolve(__dirname, '..', 'public')))

module.exports = app