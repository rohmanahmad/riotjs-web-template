require('dotenv').config({})
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const theme = process.env.THEME || 'default'

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist-dev'),
    filename: '[name].bundle.js',
    clean: true
  },
  externals: {
    url: 'url',
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      MyHelpers: path.resolve(__dirname, '/src/helpers'),
      MyModule: path.resolve(__dirname, '/src/modules/' + theme),
      MyLayout: path.resolve(__dirname, '/src/layouts/' + theme),
      MyTheme: path.resolve(__dirname, '/src/properties/assets/themes/' + theme),
      MyThemeVendors: path.resolve(__dirname, '/src/properties/assets/themes/' + theme + '/assets/vendors'),
      MyThemeImages: path.resolve(__dirname, '/src/properties/assets/themes/' + theme + '/assets/images'),
      MyThemeCss: path.resolve(__dirname, '/src/properties/assets/themes/' + theme + '/assets/css'),
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    hot: true,
    open: true,
    liveReload: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
            options: {
              hot: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/properties/assets/themes/' + theme + '/template.html',
    }),
    new webpack.DefinePlugin({
      $THEME: JSON.stringify(theme)
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}