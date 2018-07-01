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

	
function buildCurrencyTable(){
	$.get("https://peaceful-lowlands-49839.herokuapp.com/project02/getListOfCurrencies", function(data, status){
		var t = $('#currencies').DataTable();
		$.each(data, function (i, item) {
			t.row.add([data[i].code, data[i].name]).draw(false);
		});
    });

}

function saveCurrencyTable(code, name){
	
	if(code == "" || name == ""){
		alert("Please insert CODE and NAME!");		
		return;
	}
	
	var alreadyRecorded = isCoinRecorded(code);
	
	alert("isCoinRecorded: " + alreadyRecorded)
	
	if(!alreadyRecorded){
	
		$.post("https://peaceful-lowlands-49839.herokuapp.com/project02/saveCoinInCurrency?code=" + code + "&name=" + name, function(data, status){

		});
	}else{
		alert("Code \"" + code.toUpperCase() + "\" already exists!" );
	}

}

function isCoinRecorded(code){
	
	result = "";
	
	$.get("https://peaceful-lowlands-49839.herokuapp.com/project02/isCoinInRecorded?code=" + code, function(data, status){
		result = JSON.stringify(data);
    });
	
	if(result == "[]")
		return false;
	else
		return true;

}