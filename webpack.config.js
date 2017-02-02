const path = require('path')

const config = {
  entry: 'src/server/public/js/entry.js',

  output: {
    path: path.resolve(__dirname, 'dist', 'public', 'js')
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, use: 'babel-loader'
      }
    ]
  }
}

module.exports = config