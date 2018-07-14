var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";

function buildBuyDropDown(){
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
				
		$.each(data, function (i, item) {
			
			var code = data[i].code;
			var name = data[i].name;			
			
			$('#buyDropDownList').append("<div class='dropdown-divider'></div><li class='dropdown-item' onclick='buildBuySelectedCoin(this.innerHTML)'>" + code + ' - ' + name + '</li>');
			

		});

		
    });

}



function buildBuySelectedCoin(selected){
	
		
		selected = selected.split(" - ");
		var code = selected[0];
		var name = selected[1];
		
		$('#selectedCoinToBuy').val(code);
		
		var t = $('#tableSelectedBuyCoin').DataTable();
		t.clear();
			
		$.get(SERVICE + "tickerPrice?ticker=" + code, function(data, status){
			var d = new Date(Number(data.last_updated)*1000);
			t.row.add([
					code, 
					name,
					"$" + data.price_usd,
					data.percent_change_1h + "%",
					data.percent_change_24h + "%",
					data.percent_change_7d + "%",
					(d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() + " - " + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
					
			]).draw(false);
					
		});

}

function buyCoin(coinCode, quantity){
	
	try{
		quantity = Number(quantity);
		
		if(!(quantity > 0)){
			throw new Error('not valid quantity');
		}
		
	}catch(er){
		alert("Insert a valid number higher than 0");
		return;
	}
	
	$.get(SERVICE + "tickerPrice?ticker=" + coinCode, function(data, status){
			var currentPrice = Number(data.price_usd);
			var totalPaid = currentPrice * quantity;
			
			console.log("### ticker: " + JSON.stringify(data));
			
			$.post(SERVICE + "/post/buyorder/coin?code=" + coinCode + "&?name=" + data.name + "&?price=" + currentPrice + "&?quantity=" + quantity + "&?totalPaid=" + totalPaid, function(data, status){
				if(status != "success"){
					alert("Could not save your BUY ORDER!");
				}
			});
				
	});

	

}
