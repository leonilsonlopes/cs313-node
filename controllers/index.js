var express = require('express')
  , router = express.Router()

router.use('/week09', require('./week09/week09'));
router.use('/project02', require('./project02/project02'));
router.use('/project02', require('./project02/binanceCalls'));

router.all('/', function(req, res) {
  res.render('home/index')
})

router.all('/assignments', function(req, res) {
  res.render('home/assignments')
})

router.all('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router