//FE:H Custom Calc
var math = require('mathjs');

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
// hp, atk, spd, def, res, [(d)braveweapon, (e)ffective, r(a)nged, (m)agic,
//     c(o)unterable, (r)ed, (b)lue, (g)reen, c(o)lorless, ad(v)antage]
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
        for (var g in num) {
             
        }
        var dummy = {hp:math.floor((num / 100000000)), atk:math.floor((num / 1000000) % 100), spd: math.floor((num / 10000) % 100), def: math.floor((num / 100) % 100), res: math.floor(num % 100), flags:flags};
        chars[i] = dummy;
    }
    return chars;
}

function feParseTest () {
    var results = { total: 0, bad: 0};
    
    function test( ran, expected ) {
       results.total++;
       var running = feParse(ran);
       if ( running !== expected ) {
          results.bad++; 
          console.log( "Expected " + expected + ", but returned " + running);
       }
    }

    test( "3849261735gnvs3035263024b", ["3849261735gn", "3035263024b",] );
    test( "3849261735gnv3035263024b", ["3849261735gn", "3035263024b",] );
    test( "gn3849261735vb3035263024", ["gn3849261735", "b3035263024",] );
    test( "g3849261735nvsb3035263024", ["g3849261735n", "b3035263024",] );
    test( "g3849261735nv3035263024b", ["g3849261735n", "3035263024b",] );
    test( "3849261735v3035263024", ["3849261735", "3035263024",] );
    console.log( results.total - results.bad + " passed. " + results.bad + " failed out of " + results.total);
    
}
