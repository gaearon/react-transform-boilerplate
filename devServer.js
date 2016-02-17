var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var hostname = process.env.SERVER_HOSTNAME || 'localhost';
var port = process.env.SERVER_PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, hostname, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://' + hostname + ':' + port);
});
