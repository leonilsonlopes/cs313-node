var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";


function buildPriceTable(){
	
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
				

		var t = $('#priceCurrencies').DataTable();
		$.each(data, function (i, item) {
			
			var code = data[i].code;
			var name = data[i].name;
			
			$.get(SERVICE + "tickerPrice?ticker=" + code, function(data, status){			
				var d = new Date(data.last_updated);
				t.row.add([
						code, 
						name,
						"$" + data.price_usd,
						data.percent_change_1h + "%",
						data.percent_change_24h + "%",
						data.percent_change_7d + "%",
						(d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()
					]).draw(false);
					
			});
		});

		
    });

}




