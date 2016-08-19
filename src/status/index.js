const router = require('express').Router();
var os = require("os");

var hostname = os.hostname();

router.get('/', (req, res) => {
  res.status(200).send('<html><body>Hello from host ' + hostname + '</body></html>');
});

module.exports = router;
