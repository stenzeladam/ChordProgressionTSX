"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modes_1 = require("./Modes");
var Chord_1 = require("./Chord");
var ChordVoicing_1 = require("./ChordVoicing");
// Main method for console testing
function main() {
    var instance = new Modes_1.Modes("C");
    instance.applyMode("Aeolian");
    var tempChord = new Chord_1.Chord(1, instance.getScale(), instance.getChromatic());
    tempChord.buildChord();
    var tempVoicing = new ChordVoicing_1.ChordVoicing(tempChord.getNotes(), true, ["C", "F", "A#", "D#", "G", "C"]);
    tempVoicing.tuneEachString();
    //console.log(tempChord.getNotes_String());
}
// Calling the main method to run the program
main();
