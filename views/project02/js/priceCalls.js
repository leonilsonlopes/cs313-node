var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";

const binance = require('node-binance-api');

function buildPriceTable(){
	
	binance.prevDay("BNBBTC", function(error, prevDay, symbol) {
			console.log(symbol+" previous day:", prevDay);
			console.log("BNB change since yesterday: "+prevDay.priceChangePercent+"%")
	});
	
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
		
		

		var t = $('#priceCurrencies').DataTable();
		$.each(data, function (i, item) {
			t.row.add([
						data[i].code, 
						data[i].name
					]).draw(false);
		});

		
    });

}




