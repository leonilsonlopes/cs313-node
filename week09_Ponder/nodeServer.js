var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/');

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.all('/week09_Ponder', (req, res) => {  
  res.render('postalCalculator');
});

app.all('/week09_Ponder/calculatedRates', (req, res) => {  
  res.render('calculatedRate',{mail:req.body.mail,weight:req.body.weight});
});



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});

