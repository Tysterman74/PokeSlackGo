//making a a modular parser her name is BayMax

module.exports = {
	
	init(){
		return init();
	},
	
	fullParse(input){
		return fullParse(input);
	},
	
	parsePrinter(){
		return parsePrinter();
	}
}


var parsed;


function init(){
	console.log("BayMax is listening!");
	console.log("I will be taking your orders");
}//end init

function fullParse(input){
	this.parsed = input.split(" ");
	console.log("I've split the line");
	console.log("It says " + this.parsed);
	//console.log("length of parsed is " + this.parsed.length);
	parsePrinter();
}//end fullParse

function parsePrinter(){
	i=0;
	console.log("the parsed.length is" + this.parsed.length);
	while (this.parsed.length > i){
		console.log(this.parsed[i]);
		i++;
	}
}




