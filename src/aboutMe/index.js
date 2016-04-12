const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('v0.0.0')
});

module.exports = router;
