//making a weapon look up class for fe-heroes.
//similar to the charlookup so gonna try to inherit everything from it
var cLook=require('./characterlookup'); 


module.exports = {
	init(database){
		init(database);
	},
	lookUp(object, callback){
		return lookUp(object, callback)
	}
	

}

var db;//database variable


function init(database){
	console.log("I have been awakened");
	db=database;
	
	
}

function lookUp(object, callback){
	console.log("I will begin your weapon query");
	db.queryCharacter(object, function(message){
	if (message!="DNE")
	{
		var toReturn ={
			text:"Here's what the weapon I found!"
			+message[0].name;
			
		}//end toReturn
	}//end if message=1
	else{
		var toReturn={
			text:"there are " + message.length + " possible weapons."
		}//end toReturn
	}//end else
	callback(toReturn);
	}//end if message!=DNE
	else{
		var toReturn={
			text: "i couldn't find " + object + ". please check your spelling and try again."
		}//end to return
	callback(toReturn);
	}//end else

});
}