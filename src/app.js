const express = require('express');
const path = require('path');
const config = require('./config');

let app = express();

app.set('env', config.app.env);
app.use(express.static(path.join(__dirname, '../dist')));

const statusController = require('./status');
const versionController = require('./version');
const aboutMeController = require('./aboutMe');
const rootController = require('./root');

app.use('/status', statusController);
app.use('/version', statusController);
app.use('/about/me', aboutMeController);
app.use('/', rootController);


// ## ERROR HANDLING

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error(`Not Found: "${req.url}"`);
  err.status = 404;

  //let url = req.url;
  next(err);
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
