var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(require('./controllers'));