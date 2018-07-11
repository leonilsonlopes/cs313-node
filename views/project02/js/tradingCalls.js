var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";

function buildBuyDropDown(){
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
				
		$.each(data, function (i, item) {
			
			var code = data[i].code;
			var name = data[i].name;

			$('#buyDropDownList').append("<div class='dropdown-divider'></div><a class='dropdown-item' onclick='buildBuySelectedCoin(\' -- " + 'xxxx' + " -- \')'>" + code + ' - ' + name + '</a>');
			

		});

		
    });

}


function buildBuySelectedCoin(selected){
	
		alert("Selected: " + selected);
		
		selected = selected.split(" - ");
		var code = selected[0];
		var name = selected[1];

		var t = $('#tableSelectedBuyCoin').DataTable();

			
			$.get(SERVICE + "tickerPrice?ticker=" + code, function(data, status){			
				var d = new Date(data.last_updated);
				t.row.add([
						code, 
						name,
						data.price_usd,
						data.percent_change_1h,
						data.percent_change_24h,
						data.percent_change_7d,
						(d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()
					]).draw(false);
					
			});


		


}




