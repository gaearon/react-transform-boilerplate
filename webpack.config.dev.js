var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    devtoolModuleFilenameTemplate: function(info){
      if(info.absoluteResourcePath.charAt(0) === '/') {
        return "file://"+info.absoluteResourcePath;
      } else {
        return "file:///"+info.absoluteResourcePath;
      }      
    },
    devtoolFallbackModuleFilenameTemplate: function(info){
      if(info.absoluteResourcePath.charAt(0) === '/') {
        return "file://"+info.absoluteResourcePath+'?'+info.hash;
      } else {
        return "file:///"+info.absoluteResourcePath+'?'+info.hash;
      }      
    },
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html', // Load a custom template 
      inject: 'body' // Inject all scripts into the body 
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
