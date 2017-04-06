//making a a modular parser her name is BayMax

module.exports = {
	
	init(){
		return init();
	},
	
	fullParse(input){
		return fullParse(input);
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
	},
	returnParsed(){
		return returnParsed();
	}
	
}


var parsed;
var name;
var command;
var data="";

var firstIndex=0;
var secondIndex=1;

var nameIndex=0;
var commandIndex=1;
var dataIndex=2;

function init(){
	
}//end init

//This will set the name, command, and data for the object 
//then return an object that you can refer to using name, command and data.
function fullParse(input){
	this.parsed = input.split(" ");
	setName();
	setCommand();
	setData();
	return returnParsed();
	//console.log(getData());
	
}//end fullParse

function setName(){
	this.name=this.parsed[nameIndex];
}

function getName(){
	return this.name;
}

function setCommand(){
	this.command=this.parsed[commandIndex];
}

function getCommand(){
	return this.command;
}

function setData(){
	var tempData=[];
	for(i=dataIndex;this.parsed.length > i;i++){
		tempData.push(this.parsed[i]);
	}

	
	var tempString="";
	tempString=tempData[firstIndex];
	
	if (tempData.length > 1){
		for(j=secondIndex;tempData.length>j;j++){
		tempString+=" "+tempData[j];
		}
		this.data=tempString;
	}
	else
		this.data=tempString;
	
}


function getData(){
	return this.data;
}

//returns an object that you can refer to with .name / .command /.data
function returnParsed(){
	var parsedLine ={ name: getName(), command: getCommand(), data: getData()};
	return parsedLine;
}