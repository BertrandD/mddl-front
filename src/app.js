const express = require('express');
const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.dev.js');

var app = express();

app.set('env', config.app.env);

if (config.app.env === 'dev') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static(path.join(__dirname, '../nwjs/dist')));
}

const versionController = require('./version/index');
const rootController = require('./root/index');

app.use('/version', versionController);
app.use('/', rootController);

app.use('/dist', express.static(__dirname + '/../nwjs/dist'));
app.use('/img', express.static(__dirname + '/../static/img'));

// ## ERROR HANDLING

// catch 404 and forward to error handler
app.use((req, res, next) => {
	if (config.app.env === 'prod') {
		res.sendFile(__dirname + '/root/index.prod.html');
	} else {
		res.sendFile(__dirname + '/root/index.dev.html');
	}
});

// error handlers

// will print stacktrace
app.use((err, req, res) => {
  console.log(err); // eslint-disable-line no-console
  res.status(err.status || 500);
  res.json({ error: err.message || 'An error occurred' });
});


// Init server
app.listen(config.app.port, config.app.ip, () => {
  console.log('App started on port ' + config.app.port); // eslint-disable-line no-console
});

module.exports = app;
