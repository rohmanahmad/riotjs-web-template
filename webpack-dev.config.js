require('dotenv').config({})
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const theme = process.env.THEME || 'default'
const nodeEnv = process.env.NODE_ENV || 'development'
const { name, version } = require('./package.json')

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
      packagejson: path.resolve(__dirname, 'package.json'),
      MySDK: path.resolve(__dirname, '/src/modules/@sdk'),
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
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            // make all svg images to work in IE
            iesafe: true,
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/properties/assets/themes/' + theme + '/template.html',
    }),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(name),
      APP_VERSION: JSON.stringify(version),
      NODE_ENV: JSON.stringify(nodeEnv),
      R10_API_URL: JSON.stringify(process.env.R10_API_URL),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}