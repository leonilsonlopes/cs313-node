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
	
	//Build price table
	buildPriceTable();
	
	//Build Buy DropDown list
	buildBuyDropDown();
	
	//Build Sell DropDown list
	buildSellDropDown();
	
	//Build Buy Order History table
	buildBuyOrderHistory();
	
	//Build Sell Order History table
	buildSellOrderHistory();
	
	//Build wallet table;
	buildWalletTable();
	
	
} );


	
function buildCurrencyTable(){
	
	
	$.get(SERVICE + "getListOfCurrencies", function(data, status){

		var t = $('#currencies').DataTable();
		$.each(data, function (i, item) {
			t.row.add([data[i].code, data[i].name]).draw(false);
		});

		
    });

}

function saveCurrencyTable(code){
	
	if(code == ""){
		alert("Please insert a CODE!");		
		return;
	}
	
	code = code.toUpperCase();
	
	
	$.get(SERVICE + "isCoinRecorded?code=" + code, function(data, status){
		var result = JSON.stringify(data);
		
		
		if(result == "[]"){

			$.get(SERVICE + "tickerPrice?ticker=" + code, function(data, status){
	
				if(data == "NOT FOUND"){
					alert("Coin code \"" + code + "\" does not exist! Please refer to https://coinmarketcap.com/ for valid crypto coins.");
				}else{
					var name = data.name;
					$.post(SERVICE + "saveCoinInCurrency?code=" + code + "&name=" + name, function(data, status){				
						if(status == "success"){
							$('#currencies').DataTable().row.add([code, name]).draw(false);					 
							alert("Coin " + code + " | " + name + " successfully saved");
							buildPriceTable();
							buildBuyDropDown();
						}else{
							alert("Coin " + code + " | " + name + " could not be saved!");
						}
					});
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
					location.reload();
					alert("Coin " + code + " successfully updated");
					buildPriceTable();
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

			$.get(SERVICE + "/get/wallet/coin?code=" + coinCode, function(data, status){
				
				var isCoinInWallet = JSON.stringify(data);
			
				if(isCoinInWallet == "[]"){
		
					$.post(SERVICE + "deleteCoinFromCurrency?code=" + code, function(data, status){					
						if(status == "success"){
							$('#currencies').DataTable().row('.selected').remove().draw( false );					
							alert("Coin " + code + " successfully deleted");
							buildPriceTable();
							buildBuyDropDown();
						}else{
							alert("Coin " + code + " could not be deleted!");
						}
					});
				
				}else{
					alert("Coin" + code + " is present in your wallet. It cannot be deleted!");
				}
				
			});
		}
		
    });
}
