var express = require('express')
  , router = express.Router()


const { Pool } = require("pg"); // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL;

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

const binance = require('node-binance-api');

router.all('/', function(req, res){  
	res.render('project02/cryptoInterface');
}); 

//--------------------- START BINANCE CALLS ----------------------------

binance.prices('BNBBTC', (error, ticker) => {
  console.log("Price of BNB: ", ticker.BNBBTC);
});

router.all('/tickerPrice', function(req, res){  


	binance.prices('BNBBTC', (error, ticker) => {
		console.log("Price of BNB: ", ticker.BNBBTC);
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


router.all('/getAllBuyOrders', function(req, res){  
	res.send("getAllBuyOrders");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/getAllSellOrders', function(req, res){  
	res.send("getAllSellOrders");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/getListFromWallet', function(req, res){  
	res.send("getListFromWallet");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/updateWallet', function(req, res){  
	res.send("updateWallet");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/saveBuyOrder', function(req, res){  
	res.send("saveBuyOrder");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/saveSellOrder', function(req, res){  
	res.send("saveSellOrder");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/isCoinInWallet', function(req, res){  
	res.send("isCoinInWallet");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/getCoinFromWallet', function(req, res){  
	res.send("getCoinFromWallet");
	//res.render('week09_ponder/postalCalculator');
});




module.exports = router