var express = require('express')
  , router = express.Router()

console.log('#### file week09.js');
  
router.all('/week09_ponder', function(req, res) => {  
	console.log('#### router week09_ponder');
	res.render('week09_ponder!!!');
  //res.render('./views/week09_ponder/postalCalculator');
});

router.all('/week09_ponder/calculatedRates', function(req, res) => {  
	var weight = Number(req.body.weight);
	var mail = req.body.mail;
	var cost = "$";
		
	if(mail == 'Letters (Stamped)'){
		if(weight <= 1)
			cost += '0.50';
		else if(weight <= 2)
			cost += '0.71';
		else if(weight <= 3)
			cost += '0.92';
		else if(weight <= 3.5)
			cost += '1.13';
		else
			cost = 'Letters (Stamped) cannot weight more than 3.5oz.';
		
	}else if(mail == 'Letters (Metered)'){
		if(weight <= 1)
			cost += '0.47';
		else if(weight <= 2)
			cost += '0.68';
		else if(weight <= 3)
			cost += '0.89';
		else if(weight <= 3.5)
			cost += '1.10';
		else
			cost = 'Letters (Metered) cannot weight more than 3.5oz.';
		
	}else if(mail == 'Large Envelopes (Flats)'){
		if(weight <= 1)
			cost += '1.00';
		else if(weight <= 2)
			cost += '1.21';
		else if(weight <= 3)
			cost += '1.42';
		else if(weight <= 4)
			cost += '1.63';
		else if(weight <= 5)
			cost += '1.84';
		else if(weight <= 6)
			cost += '2.05';
		else if(weight <= 7)
			cost += '2.26';
		else if(weight <= 8)
			cost += '2.47';
		else if(weight <= 9)
			cost += '2.68';
		else if(weight <= 10)
			cost += '2.89';
		else if(weight <= 11)
			cost += '3.10';
		else if(weight <= 12)
			cost += '3.31';
		else if(weight <= 13)
			cost += '3.52';
		else 
			cost = 'Large Envelopes (Flats) cannot weight more than 13oz.';
		
	}else if(mail == 'First-Class Package Service—Retail'){
		if(weight <= 4)
			cost += '3.5';		
		else if(weight <= 8)
			cost += '3.75';
		else if(weight <= 9)
			cost += '4.10';
		else if(weight <= 10)
			cost += '4.45';
		else if(weight <= 11)
			cost += '4.80';
		else if(weight <= 12)
			cost += '5.15';
		else if(weight <= 13)
			cost += '5.50';
		else 
			cost = 'First-Class Package Service—Retail cannot weight more than 13oz.';
	}



	res.render('calculatedRate',{mail:mail,weight:weight,cost:cost});
});


module.exports = router