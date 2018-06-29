var express = require('express')
  , router = express.Router()


  
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