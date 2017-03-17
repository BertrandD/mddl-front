const router = require('express').Router();
const config = require('../config')

router.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.prod.html');
});

module.exports = router;
