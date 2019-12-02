import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'

const config = {
  entry: [
    './src/index.js',
    './src/scss/style.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/images'),
      scss: path.resolve(__dirname, 'src/scss')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 70000,
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/images/favicon.png'
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.devServer = {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 9000
  }

  config.plugins.push(
    new HotModuleReplacementPlugin()
  )
}

if (process.env.NODE_ENV === 'production') {
  config.module.rules[1].use[0] = MiniCssExtractPlugin.loader

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new OptimizeCssAssetsPlugin()
  )
}

export default config
