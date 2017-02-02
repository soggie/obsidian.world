import path from 'path'
import koa from 'koa'
import serve from 'koa-static'

const debug = require('debug')('ow:main')
const app = koa()

app.use(serve(path.resolve(__dirname, '..', 'public')))

if (require.main === module) {
  debug(`Listening on port`)
  app.listen(3000)
} else {
  module.exports = app
}
