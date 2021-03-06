var express = require('express')
  , router = express.Router();
  
var request = require("request");

const { Pool } = require("pg"); // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL;

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});


router.all('/', function(req, res){  
	res.render('project02/cryptoInterface');
}); 

//--------------------- START BINANCE CALLS ----------------------------



router.all('/tickerPrice', function(req, res){  
	var ticker = (req.query.ticker).toUpperCase();

	request("https://api.coinmarketcap.com/v1/ticker/", function(error, response, body) {		
		body = JSON.parse(body);
		var foundTicker = "NOT FOUND";		
		for (var i=0; i < body.length; i++) {
			if(body[i].symbol == ticker){
				foundTicker = body[i];
				break;
			}
		}
		
		res.send(foundTicker);
		
    });

});


//--------------------- END BINANCE CALLS ----------------------------

 
//--------------------- START CURRENCY TABLE OPERATIONS ----------------------------
 
router.all('/getListOfCurrencies', function(req, res){  

	var sql = "SELECT * FROM currency";
	var params = '';	
	
	
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}	
		
		res.send(result.rows);
	});

});

router.all('/getCoinFromCurrency', function(req, res){ 


	//res.render('week09_ponder/postalCalculator');
});

router.all('/saveCoinInCurrency', function(req, res){  
	var code = (req.query.code).toUpperCase();
	var name = req.query.name;
	
	var sql = "INSERT INTO currency(code, name) VALUES($1, $2)";
	var params = [code,name];	
	
	
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}

		res.send(result);
		
	});
 

});

router.all('/deleteCoinFromCurrency', function(req, res){  
	var code = req.query.code;
	
	var sql = "DELETE FROM currency WHERE code = $1";
	var params = [code];	
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}
		
		res.send(result);
		
	});
});

router.all('/updateCoinFromCurrency', function(req, res){  
	var code = (req.query.code).toUpperCase();
	var name = (req.query.name);
	
	var sql = "UPDATE currency SET code=$1, name=$2 WHERE code = $1";
	var params = [code,name];	
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}
		
		res.send(result);
		
	});
});

router.all('/isCoinRecorded', function(req, res){  

	var sql = "SELECT * FROM currency WHERE code = $1";
		
	var code = (req.query.code);
	var params = [code];
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}	
		res.send(result.rows);
	});
});


//--------------------- END CURRENCY TABLE OPERATIONS ----------------------------


//--------------------- START TRADING TABLES OPERATIONS ----------------------------

router.all('/post/buyorder/coin', function(req, res){  

	var code = (req.query.code).toUpperCase();
	var name = (req.query.name);
	var price = (req.query.price);
	var quantity = (req.query.quantity);
	var totalPaid = (req.query.totalPaid);
	
	var sql = "INSERT INTO buy_order(code, name, price, quantity, total) VALUES($1, $2, $3, $4, $5)";
	var params = [code, name, price, quantity, totalPaid];	
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}
		
		res.send(result);
		
	});


});



router.all('/post/sellorder/coin', function(req, res){  

	var code = (req.query.code).toUpperCase();
	var name = req.query.name;
	var priceWallet = req.query.price_wallet;
	var priceSell = req.query.price_sell;
	var quantity = req.query.quantity;
	var total = req.query.total
	var resultUsd = req.query.result;
	var percentResult = req.query.percent_result;
	
	var sql = "INSERT INTO sell_order(code, name, price_wallet, price_sell, quantity, total, result, percent_result) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
	var params = [code, name, priceWallet, priceSell, quantity, total, resultUsd, percentResult];	
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}
		
		res.send(result);
		
	});
});

router.all('/get/wallet/coin', function(req, res){ 
		
	var code = (req.query.code) + "";
	var params = [code];
	var sql = "SELECT c.code, c.name, w.quantity, w.paid_value, w.id FROM wallet w INNER JOIN currency c ON c.id = w.currency_code AND c.code = $1";
	
	if(code == "" || code == "undefined"){
		sql = "SELECT c.code, c.name, w.quantity, w.paid_value, w.id FROM wallet w INNER JOIN currency c ON c.id = w.currency_code";
		params = "";
	}
	
	console.log("### get/wallet/coin - SQL defined: " + sql);
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}	
		res.send(result.rows);
	});
});

router.all('/post/wallet/coin', function(req, res){ 
 
	var code = (req.query.code).toUpperCase();
	var quantity = (req.query.quantity);
	var totalPaid = (req.query.totalPaid);
	
	var sql = "INSERT INTO wallet(currency_code, quantity, paid_value) VALUES((SELECT id FROM currency WHERE code = $1), $2, $3)";
	var params = [code, quantity, totalPaid];	
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}
		
		res.send(result);
		
	});
});

router.all('/patch/wallet/coin', function(req, res){ 
 
	var id = (req.query.id);
	var quantity = (req.query.quantity);
	var totalPaid = (req.query.totalPaid);
	
	console.log("### patch wallet - id: " + id + " | quantity: " + quantity + " | totalPaid: " + totalPaid);
	
	var sql = "UPDATE wallet SET quantity=$2, paid_value=$3 WHERE id = $1";
	var params = [id, quantity, totalPaid];	
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}
		
		res.send(result);
		
	});
});

router.all('/delete/wallet/coin', function(req, res){  
	var code = req.query.code;
	
	var sql = " delete from wallet where id = (select w.id from wallet w join currency c on w.currency_code = c.id where c.code = $1)";
	var params = [code];	
		
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}
		
		res.send(result);
		
	});
});



//--------------------- END TRADING TABLES OPERATIONS ----------------------------

//--------------------- START HISTORY TABLES OPERATIONS ----------------------------

router.all('/get/buyorder', function(req, res){  

	var sql = "SELECT * FROM buy_order";
	var params = '';	
	
	
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}	
		
		res.send(result.rows);
	});
});

router.all('/get/sellorder', function(req, res){  
	var sql = "SELECT * FROM sell_order";
	var params = '';	
	
	
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			res.send(err);
		}	
		
		res.send(result.rows);
	});
});

//--------------------- END HISTORY TABLES OPERATIONS ----------------------------










module.exports = router