//making a fireemblem characterlookup class!

module.exports={
	init(database){
	 init(database);
	},
	setName(parsedObject){
		return setName(parsedObject);
	},
	getName(){
		return getName();
	},
	lookUp(object, callback){
		return lookUp(object, callback);
	}
}

var db; //database variable
var pName; //parased name variable

function init(database){
	db=database;
}

function setName(parsedObject){
	this.pName = parsedObject.data;
	this.pName;
	}

function getName(){
	return this.pName;
}

function lookUp(object, callback){
	console.log("i'm passing getName()" + getName());
		db.queryCharacter(getName(), function(message){
		if (message!="DNE"){
			console.log("Are You looking for " + message.name  + "?!?!?!?! using getName()");
			callback("Are You looking for " + message.name  + "?!?!?!?! ");
		}
		else
			callback(message);
		
	});
}

