//making a weapon look up class for fe-heroes.
//similar to the charlookup so gonna try to inherit everything from it

module.exports = {
	init(){
		init();
	},
	
	inherits (){
		inherits();
	}
		
	

}

function inherits(ctor, supterCtor){
	ctor.supe_=superCtor;
	ctor.prototype = Object.create(superCtor.prototype, {
		constructor:{
			value:ctor,
			enumerable:false,
			writable:true,
			configurable:true
		}
	});
};
function init(){
	console.log("I have been awakened");
}