var express = require('express')
  , router = express.Router()


const { Pool } = require("pg"); // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://gwknfyatpvwrft:eb3fee8b0ba8f07515faa561cdde9564b9de3d0144cfa1d271c25fe04fe0a47c@ec2-54-243-61-173.compute-1.amazonaws.com:5432/d7rfo59m77npq6";

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

console.log("### Database url: " + process.env.DATABASE_URL);  
  
  
router.all('/getListOfCurrencies', function(req, res){  
	res.send("getListOfCurrencies");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/getCoinFromCurrency', function(req, res){  
	res.send("getCoinFromCurrency");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/saveCoinInCurrency', function(req, res){  
	res.send("saveCoinInCurrency");
	//res.render('week09_ponder/postalCalculator');
});

router.all('/deleteCoinFromCurrency', function(req, res){  
	res.send("deleteCoinFromCurrency");
	//res.render('week09_ponder/postalCalculator');
});

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

router.all('/isCoinInRecorded', function(req, res){  
	res.send("isCoinInRecorded");
	//res.render('week09_ponder/postalCalculator');
});



module.exports = router