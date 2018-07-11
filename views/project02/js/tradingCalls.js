var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";

function buildBuyDropDown(){
	
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
				

		var t = $('#buyDropDownList');
		$.each(data, function (i, item) {
			
			var code = data[i].code;
			var name = data[i].name;
			
			t.append("<div class='dropdown-divider'></div><a class='dropdown-item'>" . code . ' - ' . name .'</a>';";
			

		});

		
    });

}




