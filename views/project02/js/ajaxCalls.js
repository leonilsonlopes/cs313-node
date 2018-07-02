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
	
	$('#currencies tr').remove();
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){

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
	
	code = code.toUpperCase();
	
	$.get(SERVICE + "isCoinRecorded?code=" + code, function(data, status){
		var result = JSON.stringify(data);
		
		if(result == "[]"){
			$.post(SERVICE + "saveCoinInCurrency?code=" + code + "&name=" + name, function(data, status){				
				if(status == "success"){
					 //$('#currencies').DataTable().row.add([code, name]).draw(false);
					 buildCurrencyTable();
					 alert("Coin " + code + " | " + name + " successfully saved");
				}else{
					alert("Coin " + code + " | " + name + " could not be saved!");
				}
			});
			
		}else{			
			alert("Code \"" + code + "\" already exists!" );
		}
		
    });

}

function updateCurrencyTable(code, name){
	if(code == ""){
		alert("Please select or type a coin!");		
		return;
	}
	
	$.get(SERVICE + "isCoinRecorded?code=" + code, function(data, status){
		var result = JSON.stringify(data);
		
		if(result == "[]"){
			alert("Coin " + code + " does not exist!");
			
		}else{			
			$.post(SERVICE + "updateCoinFromCurrency?code=" + code + "&name=" + name, function(data, status){					
				if(status == "success"){
					alert("Coin " + code + " successfully updated");
				}else{
					alert("Coin " + code + " | " + name + " could not be updated!");
				}
			});
		}
		
    });
}

function deleteCurrencyTable(code){
	if(code == ""){
		alert("Please select or type a coin!");		
		return;
	}
	
	$.get(SERVICE + "isCoinRecorded?code=" + code, function(data, status){
		var result = JSON.stringify(data);
		
		if(result == "[]"){
			alert("Coin " + code + " does not exist!");
			
		}else{			
			$.post(SERVICE + "deleteCoinFromCurrency?code=" + code, function(data, status){					
				if(status == "success"){
					$('#currencies').DataTable().row('.selected').remove().draw( false );					
					alert("Coin " + code + " successfully deleted");
				}else{
					alert("Coin " + code + " could not be deleted!");
				}
			});
		}
		
    });
}
