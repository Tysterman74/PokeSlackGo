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
   
   pokeHammer: function ( p1){
   	if (p1 == "mystic"){
   		return "YEAH GO MYSTIC";
   	}
   	else if (p1 == "valor"){
   		return "team dumb";
   	}
   	else if (p1 == "instinct"){
   		return "You're okay";
   	}
   	else 
   		return "YOU'RE NOTHING -MISS BITTERS";
   }
   
}
