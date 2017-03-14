//making a fireemblem characterlookup class!

module.exports={
	init(database){
	 init(database);
	},
	setName(parsedObject){
		return setName(parsedObject);
	},
	lookUp(callback){
		return lookUp(callback);
	}
}

var db; //database variable
var pName; //parased name variable

function init(database){
	console.log("Hi I'm Fae! I'll be looking up your characters");
	db=database;
}

function setName(parsedObject){
	//console.log(parsedObject);
	this.pName = parsedObject.data;
	//console.log(this.pName);
	
	}


function lookUp(callback){
	db.queryCharacter(pName, function(message){
		
		callback(message);
	});
	//console.log("i did it");
}

