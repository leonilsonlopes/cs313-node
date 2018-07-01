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
	$.post("https://peaceful-lowlands-49839.herokuapp.com/project02/saveCoinInCurrency?code=" + code = "&name=" + name, function(data, status){

    });

}

function isCoinRecorded(code){
	$.get("https://peaceful-lowlands-49839.herokuapp.com/project02/isCoinInRecorded?code=" + code, function(data, status){
		alert("### data: " + JSON.stringify(data));

    });

}