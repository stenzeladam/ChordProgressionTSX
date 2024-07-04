import { Modes } from './Modes';
import { Chord } from './Chord';
import { ChordVoicing } from './ChordVoicing';

// Main method for console testing
function main() {
    let instance = new Modes("C");
    instance.applyMode("Aeolian");
    let tempChord = new Chord(1, instance.getScale(), instance.getChromatic());
    tempChord.buildChord();
    let tempVoicing = new ChordVoicing(tempChord.getNotes(), true, ["C", "F", "A#", "D#", "G", "C"]);
    tempVoicing.tuneEachString();
    //console.log(tempChord.getNotes_String());
}

// Calling the main method to run the program
main();
