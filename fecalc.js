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
    },
    feResults (characters, callback) {
        return feResults( characters, callback );
    }
}
// global vars
// easier to change advantages later
var neutral = 1, smalladv = 1.2, smalldadv = 0.8, bigadv = 1.4, bigdadv = 0.6;
var effective = 1.5;
// readability set;
// character readability
var ATTACKING_CHARACTER = 0, DEFENDING_CHARACTER=1;
// calculation readability
var ATTACKER_DMG = 0, DEFENDER_HP = 1, DEFENDER_DMG = 2, ATTACKER_HP = 3;

// init function
function init() {
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
    var adv = [neutral, neutral], eff = [neutral, neutral];
    // Set ADV / DADV 
    if ( characters[ATTACKING_CHARACTER].flags.includes("r") ) {
        if ( characters[DEFENDING_CHARACTER].flags.includes("b") ) {
            if ( characters[ATTACKING_CHARACTER].flags.includes("a") || characters[DEFENDING_CHARACTER].flags.includes("a") ) {
                adv = [bigdadv, bigadv]; 
            } else {   
                adv = [smalldadv, smalladv];
            }
        } else if ( characters[DEFENDING_CHARACTER].flags.includes("g") ) {
            if ( characters[ATTACKING_CHARACTER].flags.includes("a") || characters[DEFENDING_CHARACTER].flags.includes("a") ) {
                adv = [bigadv, bigdadv];
            } else {   
                adv = [smalladv, smalldadv];
            }
        }
    } else if ( characters[ATTACKING_CHARACTER].flags.includes("g") ) {
        if ( characters[DEFENDING_CHARACTER].flags.includes("r") ) {
            if ( characters[ATTACKING_CHARACTER].flags.includes("a") || characters[DEFENDING_CHARACTER].flags.includes("a") ) {
                adv = [bigdadv, bigadv]; 
            } else {   
                adv = [smalldadv, smalladv];
            }
        } else if ( characters[DEFENDING_CHARACTER].flags.includes("b") ) {
            if ( characters[ATTACKING_CHARACTER].flags.includes("a") || characters[DEFENDING_CHARACTER].flags.includes("a") ) {
                adv = [bigadv, bigdadv];
            } else {   
                adv = [smalladv, smalldadv];
            }
        }
    } else if ( characters[ATTACKING_CHARACTER].flags.includes("b") ) {
        if ( characters[DEFENDING_CHARACTER].flags.includes("g") ) {
            if ( characters[ATTACKING_CHARACTER].flags.includes("a") || characters[DEFENDING_CHARACTER].flags.includes("a") ) {
                adv = [bigdadv, bigadv]; 
            } else {   
                adv = [smalldadv, smalladv];
            }
        } else if ( characters[DEFENDING_CHARACTER].flags.includes("r") ) {
            if ( characters[ATTACKING_CHARACTER].flags.includes("a") || characters[DEFENDING_CHARACTER].flags.includes("a") ) {
                adv = [bigadv, bigdadv];
            } else {   
                adv = [smalladv, smalldadv];
            }
        }
    } else if ( characters[ATTACKING_CHARACTER].flags.includes("c") ) {
        if ( characters[DEFENDING_CHARACTER].flags.includes("a") ) {
            adv = [smalldadv, smalladv];
        }
    } else {
        callback( errorMissingColor() );
    }
    for ( var i in characters ) {
        // set EFF
        if ( characters[i].flags.includes("e") )
        eff[i] = effective;
        // Calculate Damage
        // Damage: ceil(floor(floor(Atk * ADV) * EFF) - DEF/RES)
        dmg.push(math.ceil( math.floor ( math.floor ( characters[i].atk * adv[i] ) * eff[i]) - ( (characters[i].flags.includes('m')) ? characters[math.abs( i-1 )].res : characters[math.abs( i-1 )].def ) ) );
        characters[i].dmg = dmg[i];
    }
    feResults ( characters, callback );
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
function feResults ( characters, callback ) {
    var color = [], calc = [];
    var results = "FE:H Calculator\n";
    for ( var i in characters ) {
        color.push((characters[i].flags.includes("r")) ? "Red " : ((characters[i].flags.includes("g") ? "Green " : ((characters[i].flags.includes("b")) ? "Blue " : "Colorless " ) ) ) );
    }
    // Simulation
    // Save in array
    // [ Atk, DefHP, DefAtk, AttHP ]
    if ( characters[ATTACKING_CHARACTER].flags.includes("d") ) {
        calc.push( characters[ATTACKING_CHARACTER].dmg * 2 ) 
    } else {
        calc.push( characters[ATTACKING_CHARACTER].dmg ) 
    } 
    calc.push( ((characters[DEFENDING_CHARACTER].hp - calc[ATTACKER_DMG]) < 0) ? 0 : (characters[DEFENDING_CHARACTER].hp - calc[ATTACKER_DMG]) );
    calc.push( characters[DEFENDING_CHARACTER].dmg );
    calc.push( ((characters[ATTACKING_CHARACTER].hp - calc[DEFENDER_DMG]) < 0) ? 0 : (characters[ATTACKING_CHARACTER].hp - calc[DEFENDER_DMG]) );
    // Print Data
    // Attacker Data
    results += color[ATTACKING_CHARACTER] + "Attacker: \n";
    results += "HP: " + characters[ATTACKING_CHARACTER].hp + " Atk: " + characters[ATTACKING_CHARACTER].atk + " Spd: " + characters[ATTACKING_CHARACTER].spd +" Def: " + characters[ATTACKING_CHARACTER].def + " Res: " + characters[ATTACKING_CHARACTER].res + "\n\n";
    results += "VS\n\n";
    // Defender Data
    results += color[DEFENDING_CHARACTER] + "Defender: \n";
    results += "HP: " + characters[DEFENDING_CHARACTER].hp + " Atk: " + characters[DEFENDING_CHARACTER].atk + " Spd: " + characters[DEFENDING_CHARACTER].spd +" Def: " + characters[DEFENDING_CHARACTER].def + " Res: " + characters[DEFENDING_CHARACTER].res + "\n\n";
    // Initial Attack
    // Attacker Damage ( check for OHKO then Counter )
    results += color[ATTACKING_CHARACTER] + "attacks for " + calc[ATTACKER_DMG]  + "!\n" 
    results += color[DEFENDING_CHARACTER] + "is " + ( (calc[DEFENDER_HP] <= 0) ? "OHKO'd!\n" : "left with " + calc[DEFENDER_HP] + "!\n" );
    // Counter Damage
    // if both are ranged or if defender has counterable
    if ( ( (characters[ATTACKING_CHARACTER].flags.includes("n") && characters[DEFENDING_CHARACTER].flags.includes("n")) || (!characters[ATTACKING_CHARACTER].flags.includes("n") && !characters[DEFENDING_CHARACTER].flags.includes("n")) ) || (characters[ATTACKING_CHARACTER].flags.includes("n") && characters[DEFENDING_CHARACTER].flags.includes("o")) ) {
        results += color[DEFENDING_CHARACTER] + "retaliates for " + calc[DEFENDER_DMG]  + "!\n";
        results += color[ATTACKING_CHARACTER] + "is " + ( (calc[ATTACKER_HP] <= 0) ? "killed!\n" : "left with " + calc[ATTACKER_HP] + "!\n" );
    } else {
        results += color[DEFENDING_CHARACTER] + "cannot attack back!\n";
    }
    // Speed Check for Extra Attack / Counter 
    if ( (characters[ATTACKING_CHARACTER].spd - characters[DEFENDING_CHARACTER].spd) >= 5 ) {
        results += color [ATTACKING_CHARACTER] + "attacks again for " + calc[ATTACKER_DMG] + "!\n";
        results += color[DEFENDING_CHARACTER] + "is " + ( ((calc[DEFENDER_HP] - calc[ATTACKER_DMG]) <= 0) ? "killed!\n" : "left with " + ( calc[DEFENDER_HP] - calc[ATTACKER_DMG]) + "!\n" );
    } else if ( (characters[ATTACKING_CHARACTER].spd - characters[DEFENDING_CHARACTER].spd) >= 5 ) {
        if ( ( (characters[ATTACKING_CHARACTER].flags.includes("n") && characters[DEFENDING_CHARACTER].flags.includes("n")) || (!characters[ATTACKING_CHARACTER].flags.includes("n") && !characters[DEFENDING_CHARACTER].flags.includes("n")) ) || (characters[ATTACKING_CHARACTER].flags.includes("n") && characters[DEFENDING_CHARACTER].flags.includes("o")) ) {
            results += color[DEFENDING_CHARACTER] + "retaliates again for " + calc[DEFENDER_DMG]  + "!\n"; 
            results += color[ATTACKING_CHARACTER] + "is " + ( ((calc[ATTACKER_HP] - calc[DEFENDER_DMG]) <= 0) ? "killed!\n" : "left with " + (calc[ATTACKER_HP] - calc[DEFENDER_DMG]) + "!\n" );
        }     
    }
    if (typeof callback === "function" ) {
        callback ( results );
    }
}

function errorMissingColor() {
    return "Missing color designation";
}

// Tests are not used
//
// feParseTest is a Custom Unit Test for function feParse()
function feParseTest () {
    var results = { total: 0, bad: 0};
    
    function test( ran, expected ) {
       results.total++;
       var running = feParse(ran);
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