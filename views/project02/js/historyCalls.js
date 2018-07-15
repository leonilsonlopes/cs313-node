var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";

function buildBuyOrderHistory(){
	
	$.get(SERVICE + "/get/buyorder", function(data, status){
				

		var t = $('#tableShowBuyOrders').DataTable();
		t.clear();
		$.each(data, function (i, item) {
			
			var code = data[i].code;
			var name = data[i].name;
			var price = data[i].price;
			var quantity = data[i].quantity;
			var total = data[i].total;
			var date = ((data[i].date).replace("T", " ")).replace("Z","");
			
			t.row.add([
						code, 
						name,
						price,
						quantity,
						total,
						date
					]).draw(false);			

		});

		
    });
}

function buildSellOrderHistory(){
	
	$.get(SERVICE + "/get/sellorder", function(data, status){
		
		var t = $('#tableShowSellOrders').DataTable();
		t.clear();
		$.each(data, function (i, item) {
			
			var code = data[i].code;
			var name = data[i].name;
			var priceWallet = data[i].price_wallet;
			var priceSell = data[i].price_sell;
			var quantity = data[i].quantity;
			var total = data[i].total
			var resultUsd = data[i].result;
			var percentResult = data[i].percent_result;
			var date = data[i].date;
			
			t.row.add([
						code, 
						name,
						"$" + priceWallet,
						"$" + priceSell,
						quantity,
						"$" + total,
						"$" + resultUsd,
						percentResult + "%",
						date
					]).draw(false);			

		});

		
    });
}





