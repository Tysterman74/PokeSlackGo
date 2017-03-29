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
	console.log("hi");
}