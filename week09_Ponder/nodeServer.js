var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

console.log("####: " + __dirname);

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/week09_Ponder', (req, res) => {  
  console.log("### chamou / ");
  res.render('postalCalculator');
});

app.get('/week09_Ponder/home', (req, res) => {  
	console.log("### chamou /week09_Ponder/home ");
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('TESTE');
});


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});

