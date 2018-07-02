var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";

$(document).ready(function() {

	
	var table = $('#currencies').DataTable();
	

	// Handle Currency table selection
	$('#currencies').on( 'click', 'tbody tr', function () {
		if ( $(this).hasClass('selected') ) {
			$(this).removeClass('selected');
		}
		else {
			table.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		}
		
		$('input[name=code]').val(table.row( this ).data()[0]);
		$('input[name=name]').val(table.row( this ).data()[1]);

	} );

	//Build currency table
	buildCurrencyTable();
	
} );


	
function buildCurrencyTable(){
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
		/**
		var t = $('#currencies').DataTable();
		$.each(data, function (i, item) {
			t.row.add([data[i].code, data[i].name]).draw(false);
		});
		**/
		var currenciesTable = $('#currencies').DataTable();
		$.each(data, function (i, item) {
			currenciesTable.row.add(data[i].code,data[i].name);
		});
		
    });

}

function saveCurrencyTable(code, name){
	
	if(code == "" || name == ""){
		alert("Please insert CODE and NAME!");		
		return;
	}
	
	code = code.toUpperCase();
	
	$.get(SERVICE + "isCoinRecorded?code=" + code, function(data, status){
		var result = JSON.stringify(data);
		
		alert("## result: " + result);
		
		if(result == "[]"){
			$.post(SERVICE + "saveCoinInCurrency?code=" + code + "&name=" + name, function(data, status){
				alert("code/name: " + data + "\nstatus: " + JSON.stringify(status));
				if(status == "success")
					 $('#currencies').DataTable().row.add(code, name);
			});
			
		}else{			
			alert("Code \"" + code + "\" already exists!" );
		}
		
    });

}
