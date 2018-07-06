var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";


function buildPriceTable(){
	
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
				

		var t = $('#priceCurrencies').DataTable();
		$.each(data, function (i, item) {
			t.row.add([
						data[i].code, 
						data[i].name,
						1,
						1,
						1,
						1,
						1
					]).draw(false);
		});

		
    });

}




