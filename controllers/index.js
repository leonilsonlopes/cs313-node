var express = require('express')
  , router = express.Router()
  
var express = require('express')
  , app = express()

app.use('/week09_ponder', require('week09'));

router.get('/', function(req, res) {
  res.send('Home page')
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router