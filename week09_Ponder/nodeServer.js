var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
    app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());


const server = http.createServer(function onRequest (req, res) {
    
		
	if(req.url == '/week09_Ponder/home'){
		res.writeHead(200, {'Content-Type': 'text/html'});    
		res.sendFile("postalCalculator.html");
		//res.end("hello");
		
	}else if(req.url == '/week09_Ponder/getData'){
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write('{"name":"Leonilson Lopes","class":"cs313"}')
	}else{		
		res.writeHead(404, {'Content-Type': 'text/html'});
		return res.end("404 Page Not Found");
	}
	
    res.end();
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});

