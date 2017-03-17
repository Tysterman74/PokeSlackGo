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
	}

function getName(){
	return this.pName;
}

function lookUp(object, callback){
	//console.log("i'm passing getName()" + getName());
		db.queryCharacter(getName(), function(message){
		if (message!="DNE"){
/* 			console.log("Here's what I found on " + message.name + ": \n"
			+ "Color: " + message.color +"\n"
			+ "Movement Type: " + message.type +"\n \n"
			+ "Stats: \n"
			+ "HP "+ message.hplow + "/" + message.hpbase + "/" + message.hphigh +"\n" 
			+ "Atk " + message.atklow + "/" + message.atkbase + "/" + message.atkhigh +"\n"
			+ "Spd " + message.spdlow + "/" + message.spdbase + "/" + message.spdhigh +"\n"
			+ "Def " + message.deflow + "/" + message.defbase + "/" + message.defhigh +"\n"
			+ "Res " + message.reslow + "/" + message.resbase + "/" + message.reshigh +"\n"
			); */

			callback("Here's what I found on " + message.name + ": \n"
			+ "Color: " + message.color +"\n"
			+ "Movement Type: " + message.type +"\n \n"
			+ "Stats: \n"
			+ "HP "+ message.hplow + "/" + message.hpbase + "/" + message.hphigh +"\n" 
			+ "Atk " + message.atklow + "/" + message.atkbase + "/" + message.atkhigh +"\n"
			+ "Spd " + message.spdlow + "/" + message.spdbase + "/" + message.spdhigh +"\n"
			+ "Def " + message.deflow + "/" + message.defbase + "/" + message.defhigh +"\n"
			+ "Res " + message.reslow + "/" + message.resbase + "/" + message.reshigh +"\n"
			);
		}
		else
			callback("I could not that character please check your spelling and try again.");
		
	});
}

