const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: __dirname,
  entry: './src/index.tsx',
  resolve: {
    extensions:  ['.tsx', '.ts', '.js'],
  },
  mode: 'development',
  output: {
    filename: `./${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  devtool: isDev ? 'source-map' : false, 
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              }
            }
          },
          "css-loader", 
          'sass-loader'
        ]  
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:|gif|jpg|png|jpeg|svg)$/,
        use: [{
          loader: 'file-loader',
          options: `./img/${filename('[ext]')}`
        }]
      }
    ]
  },
}