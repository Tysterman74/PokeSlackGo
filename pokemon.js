//making a pokemon file yay
//it says pokemon ER NO it says pkmn

module.exports = {
    test: function () {
        console.log("test");
    },
    
   init(d){
   	init(d);
   },
	pokeParse(t1){
		return pokeParse(t1);	
   },
  
	pokeHammer (p1, l1, callback){ 
		return pokeHammer(p1,l1, callback);
   },

	pokeHelp(){
		return pokeHelp();
   }
   
}  //end module exports 


var db;
var stat;
var callBack;
function init(d){
	this.stat="listening!";
	console.log("i think i made a pokemon. it is " + this.stat);
	db=d;
	console.log("i think this is "+ db );
}

function pokeParse( t1){
    	var parsed = t1.split(" ");
		parsed[1] = parsed[1].toLowerCase();
   	return parsed;
}

//For pokeHammer, within the database object's callback, you must call the callback parameter we pass. 
//The argument is basically the message that you want to send back to the user.
//Take a look at query for an example.
function pokeHammer (p1, l1, callback){
   	var dbList=[];
   	switch(p1){
   	case "query":
   		//return this.pokeQuery(l1[2]);
   		dbList.push(l1[2]);
   		console.log("you're passing query" + dbList);
   	    //return dbList; //returns the query name

        //Call the database object, and specify the callback. It is important you specify the callback.
   		db.queryLocation(l1[2],function (message) {
   		    //Check if error or if successful return
   		    //If there are no results or there is an error, then row will be 'undefined' 
   		    //so you need to check that first before you call the callback.
   		    //if (row) {
   		    //    //This callback object is what's passed through from index.js. All it has is the code to send a response message back to the channel/user.
            //    //Once you do what you need to do above this, then pass the message you want to display back to the user into the callback.
   			//	callback("Location found. Latitude - " + row.Latitude + " Longitude - " + row.Longitude);
   			//}
   			//else {
   			//	callback("Could not find " + l1[2]);
   		    //}
   		    callback(message);
   		});
   		
   	
   	case "addlocation":
   		
   		
   		dbList.push(l1[2],l1[3],l1[4]);
   		console.log("you're passing location" + dbList);
   		
   		db.addLocation(l1[2],l1[3],l1[4],function(message){
   			
   			callback("Bill's PC has successfully added *" + message + "*!");
   			
   		});
   	
   	case "currentlocations":
   		//pokeCurLoc();
   		//return this.pokeCurLoc();
   		//dblist.push(l1[1]);
   		console.log("you're passing current location" + dbList);
   		//return dbList; //returns the call to ask for locations
   		db.getAllLocations(function (result) {
   		    callback(result);
   		    //if (rows) {
   		    //    var toReturn = "";
            //
   		    //    //for (var i = 0; i <= rows.length; i++) {
            //    //    toReturn += 
   		    //    //}
   			//	//for (var i = 0; i<=rows.length; i++){
   			//	//callback("gotta catch them all at" + rows[i].LocationName);
   		    //    //}
   		    //    callback("Returning stuff here");
   		    //    db.logDebugMessage(JSON.stringify(rows), 'tyler');
   			//}
   			//else
   			//	callback("team rocket took them :D");
   			
   		});
   		
   	
   	default:
   		//pokeHelp();
   		callback (pokeHelp());
   

function pokeHelp(){
   	return "commands are: \nQuery (name) \nAddLocation (name) (lat) (long) \nCurrentLocations";
}
function pokeAddMessage(list1){
	console.log("i'm adding in!" + list1);
	return list1.id;
}
function pokeGetLocations(err, rows){
	console.log("on the menu" + rows);
	return err +" hi " + rows.id;
	
}
function pokeQuery(err, rows){
	console.log("are you looking for " + rows + "or"+ err);
	return err + "results " + rows.id;
}


