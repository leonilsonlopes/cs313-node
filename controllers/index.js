var express = require('express')
  , router = express.Router()

router.use('/week09', require('./week09/week09'));

router.all('/', function(req, res) {
  res.send('Home page')
})

router.all('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router