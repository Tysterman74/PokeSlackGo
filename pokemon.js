//making a pokemon file yay
//it says pokemon ER NO it says pkmn

module.exports = {
    test: function () {
        console.log("test");
    },
   
	pokeParse(t1){
		return pokeParse(t1);	
   },
  
	pokeHammer (p1, l1){ 
		return pokeHammer(p1,l1);
   },

	pokeHelp(){
		return pokeHelp();
   }
   
}  //end module exports 

var database = require("./database");
database.initializeDatabase();

function pokeParse( t1){
    	var parsed = t1.split(" ");
		parsed[1] = parsed[1].toLowerCase();
   	return parsed;
}

function pokeHammer (p1, l1){
   	var dbList=[];
   	if (p1 === "query"){
   		//return this.pokeQuery(l1[2]);
   		dbList.push(l1[2]);
   		console.log("you're passing query" + dbList);
   		return dbList; //returns the query name
   	}
   	else if (p1 === "addlocation"){
   		//return this.pokeAddLoc(l1[2],l1[3],l1[4]);
   		dbList.push(l1[2],l1[3],l1[4]);
   		console.log("you're passing location" + dbList);
   		return dbList; // returns name, lat, long
   	}
   	else if (p1 === "currentlocations"){
   		//pokeCurLoc();
   		//return this.pokeCurLoc();
   		dblist.push(l1[1]);
   		console.log("you're passing current location" + dbList);
   		return dbList; //returns the call to ask for locations
   	}
   	else 
   		//pokeHelp();
   		return pokeHelp();
   }

function pokeHelp(){
   	return "commands are: \nQuery (name) \nAddLocation (name) (lat) (long) \nCurrentLocations";
}
