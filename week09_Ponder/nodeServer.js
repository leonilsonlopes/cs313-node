var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs')

console.log("####: " + __dirname);

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/', (req, res) => {  
  res.render('./week09_Postal/postalCalculator.html');
});

app.get('/home', (req, res) => {  
  res.write('TESTE');
});


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});

