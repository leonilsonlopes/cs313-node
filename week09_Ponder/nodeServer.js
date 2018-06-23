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
  // render `home.ejs` with the list of posts
  res.render('./week09_Postal/postalCalculator.html');
})


server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});

