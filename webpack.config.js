var path = require('path');
var webpack = require('webpack');

var DEVELOPMENT = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

function concat() {
  return [].slice.call(arguments).reduce(
    function(pv, v) { return pv.concat(v); }, []
  );
}

module.exports = {
  devtool: DEVELOPMENT ? 'eval' : 'source-map',
  entry: concat(
    DEVELOPMENT ? ['webpack-hot-middleware/client'] : [],
    ['./src/index']
  ),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: DEVELOPMENT ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
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
