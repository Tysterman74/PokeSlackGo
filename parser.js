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
	var tempData=[];
	while(this.parsed.length > i){
		tempData.push(this.parsed[i]);
		i++;
	}

	
	var tempString="";
	tempString=tempData[0];
	j=1;
	if (tempData.length > 1){
		while(tempData.length>j){
		tempString+=" "+tempData[j];
		j++;
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