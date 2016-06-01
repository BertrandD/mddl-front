const router = require('express').Router();
const config = require('../config')

router.get('/', (req, res) => {
	if (config.app.env === 'prod') {
		res.sendFile(__dirname + '/index.prod.html');
	} else {
		res.sendFile(__dirname + '/index.dev.html');
	}
});

module.exports = router;
