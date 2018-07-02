var SERVICE = "https://peaceful-lowlands-49839.herokuapp.com/project02/";
var CURRENCY_TABLE = $('#currencies').DataTable();

$(document).ready(function() {
	

	$('#currencies').on( 'click', 'tbody tr', function () {
		if ( $(this).hasClass('selected') ) {
			$(this).removeClass('selected');
		}
		else {
			CURRENCY_TABLE.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		}
		
		$('input[name=code]').val(CURRENCY_TABLE.row( this ).data()[0]);
		$('input[name=name]').val(CURRENCY_TABLE.row( this ).data()[1]);

	} );


} );

$(document).ready(function(){	
	buildCurrencyTable();
});	

function addRowInTable(table, code, name){
	table.row.add([code, name]).draw(false);
}

	
function buildCurrencyTable(){
	$.get(SERVICE + "getListOfCurrencies", function(data, status){
		/**
		var t = $('#currencies').DataTable();
		$.each(data, function (i, item) {
			t.row.add([data[i].code, data[i].name]).draw(false);
		});
		**/
		$.each(data, function (i, item) {
			addRowInTable(CURRENCY_TABLE,data[i].code,data[i].name);
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
					addRowInTable('#currencies',code,name);
			});
			
		}else{			
			alert("Code \"" + code + "\" already exists!" );
		}
		
    });

}
