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
	db=database;
}

function setName(parsedObject){
	this.pName = parsedObject.data;
	}


function lookUp(callback){
	db.queryCharacter(pName, function(message){
		callback(message);
	});
	
}

