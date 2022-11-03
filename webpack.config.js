require('dotenv').config({})
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const host = process.env.APP_HOST || 'localhost'
const port = process.env.APP_PORT || 3000

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle-[chunkhash].js'
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/globals/assets/themes/default/template.html',
          inject: true,
      })
  ],
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
            options: {
              hot: false, // set it to true if you are using hmr
              // add here all the other @riotjs/compiler options riot.js.org/compiler
              // template: 'pug' for example
            }
          }
        ]
      },
      {
          test: /\.(jpg|jpeg|gif|png|ico)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader?name=[name].[ext]'
            }
          ]
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            }
          ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
      liveReload: true,
      compress: true,
      port,
      host,
      hot: true,
      onListening: function () {
          console.log('Listening on port:', port)
      },
      open: true,
      watchFiles: 'src/*',
  }
}