import { Modes } from './Modes';
import { Chord } from './Chord';
import { ChordVoicing } from './ChordVoicing';
import { UberChordAPI_data } from './UberChordAPI_data';

// Main method for console testing
function main() {
    let instance = new Modes("C");
    instance.applyMode("Aeolian");
    let tempChord = new Chord(1, instance.getScale(), instance.getChromatic());
    tempChord.buildChord();
    let tempVoicing = new ChordVoicing(tempChord.getNotes(), true, ["C", "F", "A#", "D#", "G", "C"]);
    tempVoicing.tuneEachString();
    createCallandInterpretData(tempVoicing);
    //console.log(tempChord.getNotes_String());
}

async function createCallandInterpretData(param: ChordVoicing) {
    try {
        let dat = await param.fetchChordDataByVoicing(param.convertNotesToVoicing());
        //let dat = await param.fetchChordsData("X-X-X-3-5-3");
        console.log("DATA: ", dat);
        let call = new UberChordAPI_data(dat);
        let chordName = call.getEnharmonicNameAsArray();
        let data = await param.fetchChordDataByEnharmonicName(chordName);
        console.log("DATA 2: ", data);

    } catch (error) {
        console.error('Error fetching or creating instance:', error);
    }

}
// Calling the main method to run the program
main();
