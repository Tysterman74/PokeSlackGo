// FE:H Custom Calc
// LF<Trap Card - Kunai w/ Chain
var math = require('mathjs');
var _und = require('underscore');

module.exports = {
    init() {
        return init();
    },
    feCustomCalc( characters, callback ) {
        return feCustomCalc( characters, callback );
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
    // commenting out tests
    // console.log("Start this thing up");
    // console.log("\nFECalc");
    // console.log('testing feParse');
    // feParseTest();
    // console.log('\ntesting feCreateChar');
    // feCharTest();
    // console.log('\ntesting feCustomCalc');
    // feCalcTest();
    // console.log("\nFinished Tests");
}

//feCustomCalc takes data and throws back an endmessage 
// set adv 
// number vs number
// additive values before or after numbers
// hp, atk, spd, def, res, [(d)braveweapon, (e)ffective, ra(n)ged, (m)agic,
//     c(o)unterable, (r)ed, (b)lue, (g)reen, (c)olorless, (a)dvantage]
// Damage: ceil(floor(floor(Atk * ADV) * EFF) - DEF/RES)
// adv array [ initiator, defender ] 
function feCustomCalc( characters, callback ) {
    var dmg = [];
    var adv = [1, 1], eff = [1, 1];
    // Set ADV / DADV 
    if ( characters[0].flags.includes("r") ) {
        if ( characters[1].flags.includes("b") ) {
            if ( characters[0].flags.includes("a") || characters[1].flags.includes("a") ) {
                adv = [0.6, 1.4]; 
            } else {   
                adv = [0.8, 1.2];
            }
        } else if ( characters[1].flags.includes("g") ) {
            if ( characters[0].flags.includes("a") || characters[1].flags.includes("a") ) {
                adv = [1.4, 0.6];
            } else {   
                adv = [1.2, 0.8];
            }
        }
    } else if ( characters[0].flags.includes("g") ) {
        if ( characters[1].flags.includes("r") ) {
            if ( characters[0].flags.includes("a") || characters[1].flags.includes("a") ) {
                adv = [0.6, 1.4]; 
            } else {   
                adv = [0.8, 1.2];
            }
        } else if ( characters[1].flags.includes("b") ) {
            if ( characters[0].flags.includes("a") || characters[1].flags.includes("a") ) {
                adv = [1.4, 0.6];
            } else {   
                adv = [1.2, 0.8];
            }
        }
    } else if ( characters[0].flags.includes("b") ) {
        if ( characters[1].flags.includes("g") ) {
            if ( characters[0].flags.includes("a") || characters[1].flags.includes("a") ) {
                adv = [0.6, 1.4]; 
            } else {   
                adv = [0.8, 1.2];
            }
        } else if ( characters[1].flags.includes("r") ) {
            if ( characters[0].flags.includes("a") || characters[1].flags.includes("a") ) {
                adv = [1.4, 0.6];
            } else {   
                adv = [1.2, 0.8];
            }
        }
    } else if ( characters[0].flags.includes("c") ) {
        if ( characters[1].flags.includes("a") ) {
            adv = [0.8, 1.2];
        }
    } else {
        callback( errorMissingColor() );
    }
    for ( var i in characters ) {
        // set EFF
        if ( characters[i].flags.includes("e") )
        eff[i] = 1.5;
        // Calculate Damage
        // Damage: ceil(floor(floor(Atk * ADV) * EFF) - DEF/RES)
        // console.log( (characters[0].flags.includes('m')) ? characters[1].res : characters[1].def );
        dmg.push(math.ceil( math.floor ( math.floor ( characters[i].atk * adv[i] ) * eff[i]) - ( (characters[i].flags.includes('m')) ? characters[math.abs( i-1 )].res : characters[math.abs( i-1 )].def ) ) );
        characters[i].dmg = dmg[i];
        // console.log( characters[i] );
    }
    callback( characters );
    // return dmg;
            
}

// feParse will parse the data from vs and whitespace
// v/vs is the key letter for discerning the data
// remove whitespace
// look for v/vs
// split and return
// What if multiple v/vs TODO
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
// what if number is smaller TODO
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
    // l o l at the number splitter
        var dummy = {hp:math.floor((num / 100000000)), atk:math.floor((num / 1000000) % 100), spd: math.floor((num / 10000) % 100), def: math.floor((num / 100) % 100), res: math.floor(num % 100), flags:flags};
        chars[i] = dummy;
    }
    return chars;
}

// feResults is main output
// sets up turn by turn
// stat changes? TODO
function feResults ( characters ) {
    var color = [], calc = [];
    var results = "FE:H Calculator\n";
    for ( var i in characters ) {
        color.push((characters[i].flags.includes("r")) ? "Red " : ((characters[i].flags.includes("g") ? "Green " : ((characters[i].flags.includes("b")) ? "Blue " : "Colorless " ) ) ) );
    }
    // Simulation
    // Save in array
    // [ Atk, DefHP, DefAtk, AttHP ]
    if ( characters[0].flags.includes("d") ) {
        calc.push( characters[0].dmg * 2 ) 
    } else {
        calc.push( characters[0].dmg ) 
    } 
    calc.push( ((characters[1].hp - calc[0]) < 0) ? 0 : (characters[1].hp - calc[0]) );
    calc.push( characters[1].atk );
    calc.push( ((characters[0].hp - calc[2]) < 0) ? 0 : (characters[0].hp - calc[2]) );
    // console.log ( "FE:H Calculator\n" );
    // Print Data
    // Attacker Data
    results += color[0] + "Attacker: \n";
    results += "HP: " + characters[0].hp + " Atk: " + characters[0].atk + " Spd: " + characters[0].spd +" Def: " + characters[0].def + " Res: " + characters[0].res + "\n\n";
    results += "VS\n\n";
    // Defender Data
    results += color[1] + "Defender: \n";
    results += "HP: " + characters[1].hp + " Atk: " + characters[1].atk + " Spd: " + characters[1].spd +" Def: " + characters[1].def + " Res: " + characters[1].res + "\n\n";
    // Initial Attack
    // Attacker Damage ( check for OHKO then Counter )
    results += color[0] + "attacks for " + calc[0]  + "!\n" 
    results += color[1] + "is " + ( (calc[1] <= 0) ? "OHKO'd!\n" : "left with " + calc[1] + "!\n" );
    // Counter Damage
    // if both are ranged or if defender has counterable
    if ( ( (characters[0].flags.includes("n") && characters[1].flags.includes("n")) || !(characters[0].flags.includes("n") && characters[1].flags.includes("n")) ) || (characters[0].flags.includes("n") && characters[1].flags.includes("o")) ) {
        results += color[1] + "retaliates for " + calc[2]  + "!\n";
        results += color[0] + "is " + ( (calc[3] <= 0) ? "killed!\n" : "left with " + calc[3] + "!\n" );
    } else {
        results += color[1] + "cannot attack back!\n";
    }
    // Speed Check for Extra Attack / Counter 
    if ( (characters[0].spd - characters[1].spd) >= 5 ) {
        results += color [0] + "attacks again for " + calc[0] + "!\n";
        results += color[1] + "is " + ( ((calc[1] - calc[0]) <= 0) ? "killed!\n" : "left with " + ( calc[1] - calc[0]) + "!\n" );
    } else if ( (characters[0].spd - characters[1].spd) >= 5 ) {
        if ( ( (characters[0].flags.includes("n") && characters[1].flags.includes("n")) || !(characters[0].flags.includes("n") && characters[1].flags.includes("n")) ) || (characters[0].flags.includes("n") && characters[1].flags.includes("o")) ) {
            results += color[1] + "retaliates again for " + calc[2]  + "!\n"; 
            results += color[0] + "is " + ( ((calc[3] - calc[2]) <= 0) ? "killed!\n" : "left with " + (calc[3] - calc[2]) + "!\n" );
        }     
    }
    // console.log( results );
    return results;
}

function errorMissingColor() {
    console.log ( "Missing color designation");
    return "Missing color designation";
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

// feCalcTest is a Custom Test for function feCustomCalc()
function feCalcTest () {
    var results = { total: 0, bad: 0};
    
    function test( ran, expected ) {
       results.total++;
       var running = feCustomCalc(feCreateChar(feParse(ran)), feResults);
    // without feResults
    //    console.log( running );
    // had to use underscore.js for the complex equivalence
    //    if ( !_und.isEqual(running, expected) ) {
    //           results.bad++; 
    //           console.log( "Expected " + expected + " but returned " + running );
    //        }
       }
    
    test( "3849261735gnvs3035263024b", [28, 11]); 
    test( "3849261735gnv3035263024b", [28, 11]);
    test( "gn3849261735vb3035263024", [28, 11]);
    test( "g3849261735nvsb3035263024", [28, 11]);
    test( "g3849261735nv3035263024b", [28, 11]);
    test( "g 38 49 26 17 35 n v 30 35 26 30 24 b", [28, 11]);
    test( "g 38 49 26 17 35 n vs 30 35 26 30 24 b", [28, 11]);
    test( "g n 38 49 26 17 35  vs b 30 35 26 30 24", [28, 11]);
    // console.log( results.total - results.bad + " passed. " + results.bad + " failed out of " + results.total);
}