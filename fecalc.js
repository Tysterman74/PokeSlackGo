//FE:H Custom Calc
var math = require('mathjs');
var _und = require('underscore');

module.exports = {
    init() {
        return init();
    },
    feCustomCalc( characters, callback ) {
        return feCustomCalc( characters, callback);
    },
    feParse( data ) {
        return feParse( data );
    },
    feCreateChar( parseddata ) {
        return feCreateChar( parseddata );
    }
}

//init function
function init() {
    console.log("Start this thing up");
    console.log("\nFECalc");
    console.log('testing feParse');
    feParseTest();
    console.log('\ntesting feCreateChar');
    feCharTest();
    console.log("\nFinished Tests");
}

//feCustomCalc takes data and throws back an endmessage 
// how to parse string data...
// number vs number
// additive values before or after numbers
// hp, atk, spd, def, res, [(d)braveweapon, (e)ffective, ra(n)ged, (m)agic,
//     c(o)unterable, (r)ed, (b)lue, (g)reen, (c)olorless, (a)dvantage]
// Damage: ceil(floor(floor(Atk * ADV) * EFF) - DEF/RES)
function feCustomCalc( characters, endmessage ) {
    var hi = "hi";
    return hi;
}

// feParse will parse the data from vs and whitespace
// v/vs is the key letter for discerning the data
// remove whitespace
// look for v/vs
// split and return
// What if multiple v/vs
function feParse( data ) {
    var parseddata = data.replace(/ /g, "");
    // "/ /g" = regex global replace, javascript only replaces first instance
    parseddata = parseddata.toLowerCase();
    if (parseddata.includes("vs")) {
       parseddata = parseddata.split("vs");
    }
    else if ( parseddata.includes("v")) {
       parseddata = parseddata.split("v");
    }
    else {
       //kill 
    }
    return parseddata;
}

// feCreateChar creates objects for the CustomCalc
// technically a parser*
// hp, atk, spd, def, res, [(d)braveweapon, (e)ffective, ra(n)ged, (m)agic,
//     c(o)unterable, (r)ed, (b)lue, (g)reen, (c)olorless, (a)dvantage]
function feCreateChar ( parseddata ) {
    var chars = parseddata; 
    //for loop for each in array
    for ( var i = 0, len = chars.length; i < len; i++ ) {
    //regex here to split off all letters from numbers
        var num;
        var flags = [];
        chars[i] = chars[i].match(/[a-z]|[0-9]+/g); 
        for (var j in chars[i]) {
            //look for numbers only
            if (chars[i][j].toString().match(/[0-9]+/))
                num = chars[i][j]; 
            else {
                flags.push(chars[i][j].toString());
            }
        }
        var dummy = {hp:math.floor((num / 100000000)), atk:math.floor((num / 1000000) % 100), spd: math.floor((num / 10000) % 100), def: math.floor((num / 100) % 100), res: math.floor(num % 100), flags:flags};
        chars[i] = dummy;
    }
    return chars;
}

// feParseTest is a Custom Unit Test for function feParse()
function feParseTest () {
    var results = { total: 0, bad: 0};
    
    function test( ran, expected ) {
       results.total++;
       var running = feParse(ran);
    //    console.log( running );
       for ( var i = 0; i < running.length; i++ ){
           if ( running[i] != expected[i])
           {
              results.bad++; 
              console.log( "Expected " + expected + " but returned " + running );
              break; 
           }
       }
    }

    test( "3849261735gnvs3035263024b", ["3849261735gn", "3035263024b",] );
    test( "3849261735gnv3035263024b", ["3849261735gn", "3035263024b",] );
    test( "gn3849261735vb3035263024", ["gn3849261735", "b3035263024",] );
    test( "g3849261735nvsb3035263024", ["g3849261735n", "b3035263024",] );
    test( "g3849261735nv3035263024b", ["g3849261735n", "3035263024b",] );
    test( "g 38 49 26 17 35 n v 30 35 26 30 24 b", ["g3849261735n", "3035263024b",] );
    test( "g 38 49 26 17 35 n vs 30 35 26 30 24 b", ["g3849261735n", "3035263024b",] );
    test( "g n 38 49 26 17 35  vs b 30 35 26 30 24", ["gn3849261735", "b3035263024",] );
    test( "3849261735v3035263024", ["3849261735", "3035263024",] );
    console.log( results.total - results.bad + " passed. " + results.bad + " failed out of " + results.total);
    
}

// feCharTest is a Custom Unit Test for function feCreateChar()
function feCharTest () {
    var results = { total: 0, bad: 0};
    
    function test( ran, expected ) {
       results.total++;
       var running = feCreateChar(feParse(ran));
    //    console.log( running );
    // had to use underscore.js for the complex equivalence
       if ( !_und.isEqual(running, expected) ) {
              results.bad++; 
              console.log( "Expected " + expected + " but returned " + running );
           }
       }
    
    test( "3849261735gnvs3035263024b", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ]);
    test( "3849261735gnv3035263024b", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ] );
    test( "gn3849261735vb3035263024", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ] );
    test( "g3849261735nvsb3035263024", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ] );
    test( "g3849261735nv3035263024b", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ] );
    test( "g 38 49 26 17 35 n v 30 35 26 30 24 b", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ] );
    test( "g 38 49 26 17 35 n vs 30 35 26 30 24 b", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ] );
    test( "g n 38 49 26 17 35  vs b 30 35 26 30 24", [ { hp: 38, atk: 49, spd: 26, def: 17, res: 35, flags: [ 'g', 'n' ] }, { hp: 30, atk: 35, spd: 26, def: 30, res: 24, flags: [ 'b' ] } ] );
    console.log( results.total - results.bad + " passed. " + results.bad + " failed out of " + results.total);
    
}