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
   
   pokeDef: function ( p1){
   	if (p1[1].toString == "mystic"){
   		return "YEAH GO MYSTIC";
   	}
   	else if (p1[1].toString == "valor"){
   		return "team dumb";
   	}
   	else (p1[1].toString == "instinct"){
   		return "You're okay";
   	}
   }
   
}
