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
	},
	setName(){
		return setName();
	},
	getName(){
		return getName();
	},
	setCommand(){
		return setCommand();
	},
	getCommand(){
		return getCommand();
	},
	setData(){
		return setData();
	},
	getData(){
		return getData();
	}
	
}


var parsed;
var name;
var command;
var data;

function init(){
	console.log("BayMax Parser is listening!");
	//console.log("I will be parsing ");
}//end init

function fullParse(input){
	this.parsed = input.split(" ");
	
}//end fullParse

function parsePrinter(){
	i=0;
	console.log("the parsed.length is" + this.parsed.length);
	while (this.parsed.length > i){
		console.log(this.parsed[i]);
		i++;
	}
}//end parsePrinter

function setName(){
	this.name=this.parsed[0];
}

function getName(){
	return this.name;
}

function setCommand(){
	this.command=this.parsed[1];
}

function getCommand(){
	return this.command;
}

function setData(){
	i=2;
	var tempData="";
	while(this.parsed.length > i){
		tempData=tempData + this.parsed[i] + " ";
		i++;
	}
	this.data=tempData;
}

function getData(){
	return this.data;
}
