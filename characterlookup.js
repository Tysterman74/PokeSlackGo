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
		console.log(object);
		db.queryCharacter(object, function(message){
			console.log(message);
		if (message!="DNE"){
			//At this point, we need to check if it's one result in the array, multiple, or none.
			var urlName = message.name.replace(" ","_");
			var toReturn = {
				text:"Here's what I found on " + message.name + ": \n"
					+ "Color: " + message.color +"\n"
					+ "Movement Type: " + message.type +"\n \n"
					+ "Stats: \n"
					+ "HP "+ message.hplow + "/" + message.hpbase + "/" + message.hphigh +"\n" 
					+ "Atk " + message.atklow + "/" + message.atkbase + "/" + message.atkhigh +"\n"
					+ "Spd " + message.spdlow + "/" + message.spdbase + "/" + message.spdhigh +"\n"
					+ "Def " + message.deflow + "/" + message.defbase + "/" + message.defhigh +"\n"
					+ "Res " + message.reslow + "/" + message.resbase + "/" + message.reshigh +"\n",
				attachments: [
					{
						fallback: "N/A",
						color: "#4286f4",
						title: message.name + " Wiki Page",
						text: "Click on the title link for more information about " + message.name,
						author_name: "Fire Emblem Wiki",
						author_link: "http://feheroes.wiki/",
						title_link: "http://feheroes.wiki/" + urlName
					}
				]
			};
			callback(toReturn);
		}
		else {
			var toReturn = {
				text: "I could not find " + object+ ", please check your spelling and try again."
			}
			callback(toReturn);
		}
		
	});
}

