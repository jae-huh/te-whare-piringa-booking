const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new Dotenv()
  ],

  devtool: 'source-map'
}
