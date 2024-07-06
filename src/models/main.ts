import { Modes } from './Modes';
import { Chord } from './Chord';
import { ChordVoicing } from './ChordVoicing';
import { UberChordAPI_data } from './UberChordAPI_data';

// Main method for console testing
function main() {
    let instance = new Modes("E");
    instance.applyMode("Aeolian");
    let tempChord = new Chord(1, instance.getScale(), instance.getChromatic());
    tempChord.buildChord();
    let tempVoicing = new ChordVoicing(tempChord.getNotes(), false, ["C", "F", "A#", "D#", "G", "C"]);
    tempVoicing.tuneEachString();
    createCallandInterpretData(tempVoicing);
}

async function createCallandInterpretData(param: ChordVoicing) {
    try {
        const calledChordData = await param.fetchChordDataByVoicing(param.convertNotesToVoicing());
        console.log("calledChordData: ", calledChordData);
        return calledChordData;

    } catch (error) {
        console.error('Error fetching or creating instance:', error);
    }

}
// Calling the main method to run the program
main();
