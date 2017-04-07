//making a weapon look up class for fe-heroes.
//similar to the charlookup so gonna try to inherit everything from it
var cLook=require('./characterlookup'); 


module.exports = {
	init(database){
		init(database);
	},
	lookUp(object, callback){
		return lookUp(object, callback);
	},
	statToString(statList){
		return statToString(statList);
	},
	isPositive(number){
		return isPositive(number);
	}
	

}

var db;//database variable
var startIndex=0; //index that starts everything
var secondIndex=1;


function init(database){
	db=database;
	console.log("Initializing Weapon Look Up");
}

function lookUp(object, callback){
	console.log("I will begin your weapon query");
	db.queryWeapon(object, function(message){
	if (message!="DNE")
	{
		var statsString=statToString(message.stats);
		var toReturn ={
			text:"Here's what the weapon I found! \n"  
			+ message.name + "\n"
			+ "Color Type: " + message.color + " "  + message.type +"\n"
			+ "Might: " + message.might + "\n"
			+ "Trigger effect: " + message.triggereffect + "\n"
			+ "Double Atk: " + message.doubleatk +"\n"
			+ "Effective Type: " + message.effectivetype + "\n"
			+ "Advantage: " + message.advantage + "\n"
			+ "Disadvantage: " + message.disadvantage + "\n"
			+ "Special Cooldown: " + message.specialcooldown + "\n"
			+ "SP Cost: " + message.spcost + "\n"
			+ "Range: " + message.range + "\n"
			+ "Stats: " + statsString
			
		}//end toReturn
	}//end if message=1
	else{
		var toReturn={
			//text:"there are " + message + " possible weapons." + object
			text: "I could not find " + object + ". \n"
			+ "Check your spelling and try again!"
			
		}//end toReturn
	}//end else
	callback(toReturn);
	//end if message!=DNE


});
}

function statToString(statList){
	var statString="";
	statString+= statList[startIndex].statname + " " 
		+ isPositive(statList[startIndex].statvalue);
	for (i=secondIndex;i<statList.length;i++){
		statString+= "," + statList[i].statname + " "
			+ isPositive(statList[i].statvalue);
	}
	return statString;
}

function isPositive(number){
	if (number>0)
		return "+" + number;
	else
		return number;
}