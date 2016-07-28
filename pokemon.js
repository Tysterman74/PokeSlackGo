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
   
   pokeHammer: function ( p1, l1){
   	if (p1[1] === "query"){
   		this.pokeQuery(l1[2]);
   	}
   	else if (p1[1] === "addlocation"){
   		this.pokeAddLoc(l1[2],l1[3],l1[4]);
   	}
   	else if (p1[1] === "currentlocations"){
   		this.pokeCurLoc();
   	}
   	else 
   		this.pokeHelp();
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
