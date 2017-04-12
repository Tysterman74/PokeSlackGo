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
var firstIndex=0;//starting index
var secondIndex=1;//second Index


function init(database){
	db=database;
	console.log("Initializing Character Look Up");
}

function lookUp(object, callback){
		db.queryCharacter(object, function(message){
		if (message!="DNE"){
			//At this point, we need to check if it's one result in the array, multiple, or none.
			if(message.length == 1)
				{
				var urlName = message[firstIndex].name.replace(" ","_");
				var toReturn = {
					response_type: "in_channel",
					text:"Here's what I found on " + message[firstIndex].name + ": \n"
						+ "Color: " + message[firstIndex].color +"\n"
						+ "Movement Type: " + message[firstIndex].type +"\n \n"
						+ "Stats: \n"
						+ "HP "+ message[firstIndex].hplow + "/" + message[firstIndex].hpbase + "/" + message[firstIndex].hphigh +"\n" 
						+ "Atk " + message[firstIndex].atklow + "/" + message[firstIndex].atkbase + "/" + message[firstIndex].atkhigh +"\n"
						+ "Spd " + message[firstIndex].spdlow + "/" + message[firstIndex].spdbase + "/" + message[firstIndex].spdhigh +"\n"
						+ "Def " + message[firstIndex].deflow + "/" + message[firstIndex].defbase + "/" + message[firstIndex].defhigh +"\n"
						+ "Res " + message[firstIndex].reslow + "/" + message[firstIndex].resbase + "/" + message[firstIndex].reshigh +"\n",
					 attachments: [
						 {
							 fallback: "N/A",
							 color: "#4286f4",
							 title: message[firstIndex].name + " Wiki Page",
							 text: "Click on the title link for more information about " + message[firstIndex].name,
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
				var listAction=actionsArray(message);
				console.log(listAction);
				var toReturn={
					response_type: "ephereal",
					text: "There are " + possibleChar + " possible characters for *" + object + "*. \n" ,
					attachments:[{
					text: "Did you mean one of these Characters? \n",
					fallback:"unable to show possible characters",
					callback_id:"possibleCharacters",
					color:"#42b0f4",
					attachment_type:"default",
					actions: [
						listAction
					]//end actions
					}]//end attachments
				}
			}
			
			callback(toReturn);
		}
		else {
			var toReturn = {
				response_type: "in_channel",
				text: "I could not find " + object + ", please check your spelling and try again."
			}
			callback(toReturn);
		}
		
	});
}

function listToString(list){

	var listString=list[firstIndex].name;

	if (list.length > 5){
		for(i=secondIndex; i<5; i++){
			listString+="\n"+list[i].name;
		}//end while
	}//end if > 5
		
	else{
		for(i=secondIndex; i < list.length;i++){
			listString+= "\n" + list[i].name;
			
		}
	}//end else
	return listString;
}

function actionsArray (possList){
	var actions =[
	{
		name: possList[firstIndex].name,
		text: possList[firstIndex].name,
		type: "button",
		value: "fe character " + possList[firstIndex].name
	}
	];
	for (i=secondIndex;i<5;i++){
			actions+=
			[{
				name: possList[i].name,
				text: possList[i].name,
				type: "button",
				value: "fe character " + possList[i].name
				
			}]
			;
	}
	return actions;
}

