var express = require('express')
  , router = express.Router()

router.use('/week09_ponder', require('controllers/week09'));

router.get('/', function(req, res) {
  res.send('Home page')
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router