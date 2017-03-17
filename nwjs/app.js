const express = require('express');
const path = require('path');
const config = require('./config');

var app = express();

app.set('env', 'prod');
app.use(express.static(path.join(__dirname, './dist')));

const versionController = require('./version');
const rootController = require('./root');

app.use('/version', versionController);
app.use('/', rootController);

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/img', express.static(__dirname + '/static/img'));

app.use((req, res, next) => {
    res.sendFile(__dirname + '/root/index.prod.html');
});

app.use((err, req, res) => {
  console.log(err); // eslint-disable-line no-console
  res.status(err.status || 500);
  res.json({ error: err.message || 'An error occurred' });
});

app.listen(config.app.port, config.app.ip, () => {
  console.log('App started on port ' + config.app.port); // eslint-disable-line no-console
});

module.exports = app;
