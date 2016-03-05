var webpack = require('webpack');
var merge = require('lodash.merge');
var baseConfig = require('./config.base');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  plugins: baseConfig.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]),
});
