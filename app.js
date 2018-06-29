var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(require('./controllers'));


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});