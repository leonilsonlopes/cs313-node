var ajax = require("node.ajax");

function getListOfCurrencies(){
	console.log("### called function: getListOfCurrencies");
	var res = yield ajax("https://peaceful-lowlands-49839.herokuapp.com/project02/getListOfCurrencies","GET",{
    params: value
	},{'Content-Type': 'application/x-www-form-urlencoded'},"utf8");
	
	return res;
}