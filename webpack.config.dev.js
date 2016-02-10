var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    devtoolModuleFilenameTemplate: function(info){
      if(info.absoluteResourcePath.charAt(0) === '/') {
        return 'file://'+info.absoluteResourcePath;
      } else {
        return 'file:///'+info.absoluteResourcePath;
      }      
    },
    devtoolFallbackModuleFilenameTemplate: function(info){
      if(info.absoluteResourcePath.charAt(0) === '/') {
        return 'file://'+info.absoluteResourcePath+'?'+info.hash;
      } else {
        return 'file:///'+info.absoluteResourcePath+'?'+info.hash;
      }      
    },
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
