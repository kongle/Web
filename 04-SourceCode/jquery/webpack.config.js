const path = require('path');

const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath:'/dist'
  },
    devServer:{
        open: true,
        port: 8080,
        // contentBase: "./",
        hot: true,
        inline: true,
        historyApiFallback: true
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()
      // new htmlWebpackPlugin({
      //     template: path.join(__dirname, './src/index.html'),
      //     filename: 'index.html'
      // })
  ]
};