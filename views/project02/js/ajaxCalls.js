$(document).ready(function() {
	
	var table = $('#currencies').DataTable();

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


} );

$(document).ready(function(){	
	buildCurrencyTable();
});	

function addRowInTable(tableRef, code, name){
	var t = $(tableRef).DataTable();
	t.row.add([code, name]).draw(false);
}

	
function buildCurrencyTable(){
	$.get("https://peaceful-lowlands-49839.herokuapp.com/project02/getListOfCurrencies", function(data, status){
		/**
		var t = $('#currencies').DataTable();
		$.each(data, function (i, item) {
			t.row.add([data[i].code, data[i].name]).draw(false);
		});
		**/
		$.each(data, function (i, item) {
			addRowInTable('#currencies',data[i].code,data[i].name]);
		});
		
    });

}

function saveCurrencyTable(code, name){
	
	if(code == "" || name == ""){
		alert("Please insert CODE and NAME!");		
		return;
	}
	
	$.get("https://peaceful-lowlands-49839.herokuapp.com/project02/isCoinRecorded?code=" + code, function(data, status){
		var result = JSON.stringify(data);
		
		alert("## result: " + result);
		
		if(result == "[]"){
			$.post("https://peaceful-lowlands-49839.herokuapp.com/project02/saveCoinInCurrency?code=" + code + "&name=" + name, function(data, status){
				alert("saved: " + JSON.stringify(data) + "\nstatus: " + JSON.stringify(status));
				addRowInTable('#currencies',data.code,data.name]);
			});
			
		}else{			
			alert("Code \"" + code.toUpperCase() + "\" already exists!" );
		}
		
    });

}
