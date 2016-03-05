var webpack = require('webpack');
var merge = require('lodash.merge');
var baseConfig = require('./config.base');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client'
  ].concat(baseConfig.entry),
  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
});
