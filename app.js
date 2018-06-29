var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
app = express();



app.set('view engine', 'ejs');
app.set('views', __dirname + '/view/week09_ponder');




app.use(require('./controllers'));


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});