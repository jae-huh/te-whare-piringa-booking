const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/public'),
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
    new LiveReloadPlugin(),
    new webpack.EnvironmentPlugin({
      CALLBACK: 'http://localhost:3000/callback'
    })
  ],
  devtool: 'source-map'
}
