var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";

function buildBuyDropDown(){
	
	$('#buyDropDownList').empty();
	
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
					"$" + (Number(data.price_usd)).toFixed(2),
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
		alert("Quantity must be a valid number higher than 0!");
		return;
	}
	
	$.get(SERVICE + "tickerPrice?ticker=" + coinCode, function(data, status){
			var currentPrice = Number(data.price_usd).toFixed(2);
			var totalPaid = (currentPrice * quantity).toFixed(2);
			var name = data.name;	
			

			$.post(SERVICE + "/post/buyorder/coin?code=" + coinCode + "&name=" + name + "&price=" + currentPrice + "&quantity=" + quantity + "&totalPaid=" + totalPaid, function(data, status){
				if(status = "success"){
					alert("Buy Order Successfully saved!\nTicker: " + coinCode + "\nName: " + name + "\nPaid Price: " + currentPrice + "\nQuantity: " + quantity + "\nTotal Paid: " + totalPaid);
					updateWallet(coinCode, quantity, totalPaid, "buy");
					buildBuyOrderHistory();
				}else{
					alert("Could not save your BUY ORDER!");
				}
			});
				
	});

	
}

function buildSellDropDown(){
	
	$('#sellDropDownList').empty();
	
	$.get(SERVICE + "/get/wallet/coin", function(data, status){
				
		$.each(data, function (i, item) {
			
			var code = data[i].code;
			var name = data[i].name;			
			
			$('#sellDropDownList').append("<div class='dropdown-divider'></div><li class='dropdown-item' onclick='buildSellSelectedCoin(this.innerHTML)'>" + code + ' - ' + name + '</li>');
			

		});

		
    });

}

function buildSellSelectedCoin(selected){
	
		
		selected = selected.split(" - ");
		var code = selected[0];
		var name = selected[1];
		
		$('#selectedCoinToSell').val(code);
		
		var t = $('#tableSelectedSellCoin').DataTable();
		t.clear();
			
		$.get(SERVICE + "tickerPrice?ticker=" + code, function(data, status){
			var d = new Date(Number(data.last_updated)*1000);
			t.row.add([
					code, 
					name,
					"$" +  (Number(data.price_usd)).toFixed(2),
					data.percent_change_1h + "%",
					data.percent_change_24h + "%",
					data.percent_change_7d + "%",
					(d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() + " - " + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
					
			]).draw(false);
					
		});

}


function buildWalletTable(){
	
	$.get(SERVICE + "/get/wallet/coin", function(data, status){
				

		var t = $('#wallet').DataTable();
		t.clear();
		$.each(data, function (i, item) {
			
			var code = data[i].code;		
			var name = data[i].name;
			var quantity = Number(data[i].quantity);
			var totalPaidValue = Number(data[i].paid_value).toFixed(2);
			
			$.get(SERVICE + "tickerPrice?ticker=" + code, function(data, status){
				var currentPrice = Number(data.price_usd).toFixed(2);				
				var totalCurrentPrice = (currentPrice * quantity).toFixed(2);
				var percentResult = (((totalCurrentPrice / totalPaidValue) - 1)*100).toFixed(2);
				
				t.row.add([
						code, 
						name,
						quantity,
						"$" + totalPaidValue,
						"$" + currentPrice,
						"$" + totalCurrentPrice,
						percentResult + "%"
					]).draw(false);	
				
			});			
			
					

		});

		
    });
	
	
}


function updateWallet(coinCode, quantity, totalPaid, operation){
	
	quantity = Number(quantity);
	totalPaid = Number(totalPaid);
	

	//Check if coin is already present in wallet
	$.get(SERVICE + "/get/wallet/coin?code=" + coinCode, function(data, status){
		
		var isCoinInWallet = JSON.stringify(data);
			
		if(isCoinInWallet != "[]"){
			if(operation == "buy"){	

				var id = data[0].id + "";
				var currentQuantity = Number(data[0].quantity);
				var newQuantity = currentQuantity + quantity;
				var currentTotalPaid = Number(data[0].paid_value);
				var newTotalPaid = (totalPaid + currentTotalPaid).toFixed(2);
				
				console.log("### get coin in wallet - id: " + id + " | newQuantity: " + newQuantity + " | newTotalPaid: " + newTotalPaid);
				
				$.get(SERVICE + "/patch/wallet/coin?id=" + id + "&quantity=" + newQuantity + "&totalPaid=" + newTotalPaid, function(data, status){
					if(status = "success"){
						alert("Wallet Successfully Updated! Existing coin updated in your wallet.\nCoin: " + coinCode + "\nQuantity: " + quantity + "\nTotal Paid: " + totalPaid);					
						buildWalletTable();
					}else{
						alert("Could not save your BUY ORDER!");
					}		
				});
				
			}else{
				
				
			}
			
		}else{
			
			if(operation == "buy"){
		
				$.get(SERVICE + "/post/wallet/coin?code=" + coinCode + "&quantity=" + quantity + "&totalPaid=" + totalPaid, function(data, status){
					if(status = "success"){
						alert("Wallet Successfully Updated - New coin added to your wallet!\Coin: " + coinCode + "\nQuantity: " + quantity + "\nTotal Paid: " + totalPaid);					
						buildWalletTable();
						buildSellDropDown();
					}else{
						alert("Could not save your BUY ORDER!");
					}		
				});
			
			}else{
				alert("Coin does not exist in wallet! Cannot be sold!");
			}
			
		}
	
	 });

	
}
