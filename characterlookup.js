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
	},
	listToString(list){
		return listToString(list);
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
		db.queryCharacter(object, function(message){
		if (message!="DNE"){
			//At this point, we need to check if it's one result in the array, multiple, or none.
			if(message.length == 1)
				{
				var urlName = message[0].name.replace(" ","_");
				var toReturn = {
					text:"Here's what I found on " + message[0].name + ": \n"
						+ "Color: " + message[0].color +"\n"
						+ "Movement Type: " + message[0].type +"\n \n"
						+ "Stats: \n"
						+ "HP "+ message[0].hplow + "/" + message[0].hpbase + "/" + message[0].hphigh +"\n" 
						+ "Atk " + message[0].atklow + "/" + message[0].atkbase + "/" + message[0].atkhigh +"\n"
						+ "Spd " + message[0].spdlow + "/" + message[0].spdbase + "/" + message[0].spdhigh +"\n"
						+ "Def " + message[0].deflow + "/" + message[0].defbase + "/" + message[0].defhigh +"\n"
						+ "Res " + message[0].reslow + "/" + message[0].resbase + "/" + message[0].reshigh +"\n",
					 attachments: [
						 {
							 fallback: "N/A",
							 color: "#4286f4",
							 title: message[0].name + " Wiki Page",
							 text: "Click on the title link for more information about " + message[0].name,
							 author_name: "Fire Emblem Wiki",
							 author_link: "http://feheroes.wiki/",
							 title_link: "http://feheroes.wiki/" + urlName
						 }
					 ]
				}//end toReturn
			}//end if message=1
			else{
				var possibleChar=message.length;
				var listChar=listToString(message);
				var toReturn={
					text: "There are " + possibleChar + " possible characters for *" + object + "*. \n" 
					+ "Did you mean one of these Characters? \n"
					+ listChar 
				}
			}
			
			callback(toReturn);
		}
		else {
			var toReturn = {
				text: "I could not find " + object + ", please check your spelling and try again."
			}
			callback(toReturn);
		}
		
	});
}

function listToString(list){
	var i =1;
	var listString=list[0].name;
	//console.log("there are " + list.length);
	if (list.length > 5){
		while (i<5){
			listString+="\n"+list[i].name;
			i++;
		}//end while
	}//end if > 5
		
	else{
		while(i < list.length){
			listString+= "\n" + list[i].name;
			i++;
		}
	}//end else
	//console.log(listString);
	return listString;
}
	
