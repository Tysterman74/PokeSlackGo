//making a pokemon file yay
//it says pokemon ER NO it says pkmn

//module.exports = {
//	pkmn:function(){
//	console.log("woooh yeah pkmn");
	
//	}

//}
module.exports = {
    test: function () {
        console.log("test");
    },
   
    pokeParse: function ( t1){
    	var lower = t1.toLowerCase();
    	var parsed =lower.split(" ");
   	return parsed;
   	
   },
   
   pokeHammer: function ( l1){
   	var dbList;
   	if (l1[1] === "query"){
   		//pokeQuery(l1[2]);
   		return l1[2];
   	}
   	else if (l1[1] === "addlocation"){
   		//pokeAddLoc(l1[2],l1[3],l1[4]);
   		return dbList(1[2],l1[3],l1[4]);
   	}
   	else if (l1[1] === "currentlocations"){
   		//pokeCurLoc();
   		return this.pokeCurLoc();
   	}
   	else 
   		//pokeHelp();
   		return this.pokeHelp();
   },
   pokeQuery: function( name1){
   	return "i looked and " + name1 +" said no";
   },
   
   pokeAddLoc: function (name1, lat, long){
   	return "i dont know " + name1 + " at "+ lat+ "," + long;
   },
   
   pokeCurLoc: function(){
   	return "el oh el this is what we have";
   },
   
   pokeHelp: function (){
   	return "commands are: \nQuery (name) \nAddLocation (name) (lat) (long) \nCurrentLocations";
   }
   
   
   
}
