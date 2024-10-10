import { CustomChordData } from "./CustomChordData";
import { Tonal, Chord as TonalChord } from "@tonaljs/tonal"; // I already created my own Chord class. This is simpler than refactoring and avoids confusion

export class ChordVoicing {
    private readonly NOTES: string[];
    private readonly COMPENSATE_TUNING: boolean;
    private tuning: string[] = ["E", "A", "D", "G", "B", "E"] //standard tuning as default. Only change if _compensateTuning is true
                                                              //starts with string6, string5, ... , string1
    private stringNotes: string[][] = [
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"], //string6 is stringNotes[0]
        ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], //string5 is stringNotes[1]
        ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"], //string4 is stringNotes[2]
        ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"], //string3 is stringNotes[3]
        ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"], //string2 is stringNotes[4]
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]  //string1 is stringNotes[5]
    ];

    private readonly STANDARD: string[][] = [                              //Always have standard tuning available to reference
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"], //string6
        ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], //string5
        ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"], //string4
        ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"], //string3
        ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"], //string2
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]  //string1
    ];

    constructor(param_notes: string[], param_compensate: boolean, param_tuning?: string[]) {
        this.NOTES = param_notes;
        this.COMPENSATE_TUNING = param_compensate;
        if(param_compensate && !param_tuning) { //should be an error because the selected tuning needs to be specified to know how to handle compensation
            throw new Error("The selected tuning needs to be specified to handle compensation");
        }
        else if (param_compensate && param_tuning) {
            this.tuning = param_tuning;
        }
    }

    public tuneEachString(): void {
        for (let nthString = 0; nthString < this.tuning.length; nthString++) { //iterate through array from string6 (lowest) to string1 (highest)
            let displacement = 0;
            while ((this.tuning[nthString] != this.stringNotes[nthString][displacement]) && (displacement < 12)) {
                displacement++; //displacement will tell us how much we need to shift/offset the array, so that this.stringNotes[nthString][0] will be equal to that string's tuning
            }
                let currentString = this.stringNotes[nthString];
                let size = currentString.length;
                displacement = size - displacement;
                displacement = displacement % size;

                const reverse = (start: number, end: number): void => {
                    while (start < end) {
                        [currentString[start], currentString[end]] = [currentString[end], currentString[start]];
                        start++;
                        end--;
                    }
                };
                reverse(0, size - 1);
                reverse(0, displacement - 1);
                reverse(displacement, size - 1);
        }
    }

        // Overloaded signatures
        public convertNotesToBasicVoicing(): string;
        public convertNotesToBasicVoicing(input: string[][]): string;
    
        public convertNotesToBasicVoicing(input?: string[][]): string {
            // This is a basic voicing. This voicing does not give any consideration to playability.
            const numOfNotesInChord = this.NOTES.length;
            let tabsFrets: string[] = ["X", "X", "X", "X", "X", "X"];
            const maxFret = 20; // doesn't accept voicings with fret numbers greater than 20
            let offset: number[] = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8, -8, 9, -9, 10, -10, 11, -11];
    
            for (let nthString = 0; nthString < numOfNotesInChord; nthString++) {
                let currentString = input ? input[nthString] : this.stringNotes[nthString];
                let fret: number = 0;
                let fretPrevious: number;
    
                if (nthString === 0) { // For the 0th string, find the first note in this.NOTES where 0 <= frets < 12
                    while (currentString[fret] !== this.NOTES[nthString] && fret < currentString.length) {
                        fret++;
                    }
                } else { // For all other strings, find the next note in this.NOTES where 0 <= frets <= maxFret, finding the closest fret to the previous fret
                    fretPrevious = parseInt(tabsFrets[nthString - 1], 10); // the fret of the previous string
                    for (let offsetIndex = 0; offsetIndex < offset.length; offsetIndex++) {
                        fret = fretPrevious + offset[offsetIndex];
                        if (fret >= 0 && fret <= maxFret) {
                            if (currentString[fret % 12] === this.NOTES[nthString]) {
                                tabsFrets[nthString] = fret.toString();
                                break;
                            }
                        }
                    }
                }
                tabsFrets[nthString] = fret.toString();
            }
    
            let voicing: string = "";
            for (let i = 0; i < 6; i++) {
                if (i < 5) {
                    voicing = voicing + tabsFrets[i] + "-";
                } else {
                    voicing = voicing + tabsFrets[i];
                }
            }
            return voicing;
        }

    private convertFlatsToSharps(param: string[]): string[] {
        let chordNotes = param;
        for (let i = 0; i < chordNotes.length; i++) { //for consistency in how notes are written, convert all flats to their sharp equivalent. Ex: Eb -> D#
            switch(chordNotes[i]) {
                case "Db":
                    chordNotes[i] = "C#";
                    break;
                case "Eb":
                    chordNotes[i] = "D#";
                    break;
                case "Gb":
                    chordNotes[i] = "F#";
                    break;
                case "Ab":
                    chordNotes[i] = "G#";
                    break;
                case "Bb":
                    chordNotes[i] = "A#";
                    break;
                default:
                    break;
            }
        }
        return chordNotes;
    }
    
    private voicing(paramTones: string[], n: number, whichStringNotes: string[][]): string[]  {
        let voicing: string[] = ["X", "X", "X", "X", "X", "X"];
        const chordNotes: string[] = this.convertFlatsToSharps(paramTones); //***CORRECT ONE TO USE FOR CODE***
        //const chordNotes: string[] = ["F", "G#", "B", "D#"] // ***TESTING PURPOSES ONLY***
        //const chordNotes: string[] = ["D#", "G", "A#"] // ***TESTING PURPOSES ONLY***
        if (paramTones.length < 2) {
            return ["ERROR", "ERROR", "ERROR"];
        }

        let voicingNoteAdded: Map<string, boolean> = new Map(); //hashmap to check if note has been added to voicing, so notes not added yet can be prioritized
        let dontGoBelowRootFret: {value: boolean} = {value: false}; // wrapped as an object so that the the boolean is passed by reference, not by value
        let dontGoAboveRootFret: {value: boolean} = {value: false}; // if true, only check below root fret by 4 notes. Only set to true if the root fret is > 2. 
        let fretTimesUsed: Map<number, number> = new Map(); // keep count of the times each fret is used. If any fret is ever used more than twice, don't go below root fret

        for (let i = 0; i < chordNotes.length; i++) {
            voicingNoteAdded.set(chordNotes[i], false);
        }
        //find the root note on string(6 - n) --- if n === 0, this is string6 aka the lowest string 
        for (let fret = 0; fret < 12; fret++) {
            if (whichStringNotes[n][fret] === chordNotes[0]) {
                fretTimesUsed.set(fret, 1);
                voicing[n] = fret.toString();
                voicingNoteAdded.set(chordNotes[0], true);
            }
        }
        const voicingRootFret: number = parseInt(voicing[n], 10); //to ensure the integer is of base 10

        dontGoAboveRootFret.value = this.isFifthOnOpenString(n, voicingRootFret, voicingNoteAdded, whichStringNotes); //checks if the fifth is on an open string for the next two strings
        // try to find the next best note on the next string for each voicing
        // Give priority to finding the 5th (in most cases, chordNotes[2]) on the next string for each voicing. 
        // Check up to four frets above, or two frets below.

        //for voicing, check stringNotes[n + 1][voicingOneRootFret] for the 5th (interval)
        let lookFor5th: boolean = true;
        this.checkStringForNotes((n+1), voicingRootFret, voicingNoteAdded, 
            voicing, lookFor5th, dontGoAboveRootFret, dontGoBelowRootFret, fretTimesUsed, whichStringNotes);

        
        let allNotesAdded = Array.from(voicingNoteAdded.values()).every(value => value === true);
        if (paramTones.length == 2 && allNotesAdded) { //Checking if the chord is supposed to be a power chord
            return voicing;
        }
        //check the rest of the strings
        for (let i = (n + 2); i < 6; i++) {
            this.checkStringForNotes(i, voicingRootFret, voicingNoteAdded, 
                voicing, false, dontGoAboveRootFret, dontGoBelowRootFret, fretTimesUsed, whichStringNotes); //last parameter is false because no longer looking for the fifth 
            allNotesAdded = Array.from(voicingNoteAdded.values()).every(value => value === true);
            if (paramTones.length == 2 && allNotesAdded) { //Checking if the chord is supposed to be a power chord
                return voicing;
            }
        }
        // Check for first note in notes array, then prioritize finding the notes mostly sequentially
        // prioritize finding the fifth, flat 5th, then the fourth, then the third if possible. Also prioritize any notes that 
        // have not been assigned yet. Example: A_add9 should return something close to 5-7-9-6-5-5
        // Find A on the 6th string. 5th fret
        // then check the 5th string for the 5th, which is E. The fret needs to be within 4 frets above or 2 frets below, alternating checks
        // if the note is more than 2 frets above, then can't check any notes below root fret
        // if the 5th is not there,
        return voicing;
    }

    private checkStringForNotes(
        stringN: number,
        voicingRootFret: number,
        voicingNoteAdded: Map<string, boolean>,
        voicing: string[],
        lookFor5th: boolean,
        dontGoAboveRootFret: { value: boolean },
        dontGoBelowRootFret: { value: boolean },
        fretTimesUsed: Map<number, number>,
        whichStringNotes: string[][]
    ): void {
        const fretOffsets = this.getFretOffsets(dontGoAboveRootFret.value, dontGoBelowRootFret.value);
    
        let voicingStringN: boolean = false; // if a suitable note for the voicing has been assigned on the current Nth string, set to true
    
        for (let note of voicingNoteAdded.keys()) {
            if (voicingStringN) { // once a suitable note on the string has been found
                break;
            }
    
            if (lookFor5th) { // this should only ever be true when only the root note has been added
                voicingStringN = this.findAndAssignFifth(
                    stringN,
                    voicingRootFret,
                    voicingNoteAdded,
                    voicing,
                    dontGoBelowRootFret,
                    fretTimesUsed,
                    whichStringNotes,
                    fretOffsets
                );
            }
    
            if (voicingNoteAdded.get(note) === false && !voicingStringN) { // if true, then the key/note has not been added and should be searched for on this string
                voicingStringN = this.findAndAssignNote(
                    stringN,
                    voicingRootFret,
                    note,
                    voicingNoteAdded,
                    voicing,
                    dontGoBelowRootFret,
                    fretTimesUsed,
                    whichStringNotes,
                    fretOffsets
                );
            }
        }
    
        if (!voicingStringN) { // If none of the unassigned notes are suitable for this string, check for any notes
            this.findAndAssignAnyNote(
                stringN,
                voicingRootFret,
                voicingNoteAdded,
                voicing,
                dontGoBelowRootFret,
                fretTimesUsed,
                whichStringNotes,
                fretOffsets
            );
        }
        return;
    }
      
    private getFretOffsets(dontGoAboveRootFret: boolean, dontGoBelowRootFret: boolean): number[] {
        // Determine fret offsets based on whether the voicing should avoid going above or below the root fret
        if (dontGoAboveRootFret) {
          return [0, -1, -2, -3, -4, -5];
        }
        if (dontGoBelowRootFret) {
          return [0, 1, 2, 3, 4];
        }
        return [0, 2, 1, -1, -2, 3, 4];
    }
      
    private findAndAssignFifth(
        stringN: number,
        voicingRootFret: number,
        voicingNoteAdded: Map<string, boolean>,
        voicing: string[],
        dontGoBelowRootFret: { value: boolean },
        fretTimesUsed: Map<number, number>,
        whichStringNotes: string[][],
        fretOffsets: number[]
    ): boolean {
        let tempFret;
        let fifth = this.searchForFifthOfRoot(voicingNoteAdded);
        if (fifth !== "None") { // searchForFifthOfRoot was able to find a fifth as a key in voicingNoteAdded
            for (let i of fretOffsets) {
            tempFret = voicingRootFret + i;
                if (tempFret >= 0) {
                    let x = tempFret % 12; // use (fret % 12) to find notes above the 12th fret
                    if (whichStringNotes[stringN][x] === fifth) {
                        this.assignFret(
                            stringN,
                            tempFret,
                            fifth,
                            voicing,
                            voicingNoteAdded,
                            fretTimesUsed,
                            dontGoBelowRootFret,
                            i
                        );
                        return true; // interval 5th has been found and has been assigned for the current string
                    }
                }
            }
        }
        return false;
    }
      
    private findAndAssignNote(
        stringN: number,
        voicingRootFret: number,
        note: string,
        voicingNoteAdded: Map<string, boolean>,
        voicing: string[],
        dontGoBelowRootFret: { value: boolean },
        fretTimesUsed: Map<number, number>,
        whichStringNotes: string[][],
        fretOffsets: number[]
    ): boolean {
        for (let i of fretOffsets) {
            if (!dontGoBelowRootFret.value || (dontGoBelowRootFret.value && i >= 0)) { // don't check frets below the root fret if there is one note in the voicing that is at least two frets above the root fret
                let tempFret = voicingRootFret + i;
                if (tempFret >= 0) {
                    let x = tempFret % 12; // use (fret % 12) to find notes above the 12th fret
                    if (whichStringNotes[stringN][x] === note) {
                        this.assignFret(
                            stringN,
                            tempFret,
                            note,
                            voicing,
                            voicingNoteAdded,
                            fretTimesUsed,
                            dontGoBelowRootFret,
                            i
                        );
                        return true;
                    }
                }
            }
        }
        return false;
    }
      
    private findAndAssignAnyNote(
        stringN: number,
        voicingRootFret: number,
        voicingNoteAdded: Map<string, boolean>,
        voicing: string[],
        dontGoBelowRootFret: { value: boolean },
        fretTimesUsed: Map<number, number>,
        whichStringNotes: string[][],
        fretOffsets: number[]
    ): void {
        for (let i of fretOffsets) {
            if (!dontGoBelowRootFret.value || (dontGoBelowRootFret.value && i >= 0)) { // don't check frets below the root fret if there is one note in the voicing that is at least two frets above the root fret
                let tempFret = voicingRootFret + i;
                if (tempFret >= 0) {
                    let x = tempFret % 12; // use (fret % 12) to find notes above the 12th fret
                    let tempNote = whichStringNotes[stringN][x];
                    if (voicingNoteAdded.has(tempNote)) {
                        this.assignFret(
                            stringN,
                            tempFret,
                            tempNote,
                            voicing,
                            voicingNoteAdded,
                            fretTimesUsed,
                            dontGoBelowRootFret,
                            i
                        );
                        break;
                    }
                }
            }
        }
        return;
    }
      
    private assignFret(
        stringN: number,
        tempFret: number,
        note: string,
        voicing: string[],
        voicingNoteAdded: Map<string, boolean>,
        fretTimesUsed: Map<number, number>,
        dontGoBelowRootFret: { value: boolean },
        i: number
    ): void {
        voicing[stringN] = tempFret.toString();
        if (!fretTimesUsed.has(tempFret)) {
            fretTimesUsed.set(tempFret, 1); // used once
        } 
        else {
            let count = fretTimesUsed.get(tempFret);
            if (count != undefined) {
                count++;
                fretTimesUsed.set(tempFret, count); // increment the count for the fret
            }
        }
        voicingNoteAdded.set(note, true);
        if (i >= 2 || this.fretUsedMoreThanTwice(fretTimesUsed)) { // Cases where it would be too difficult to play the voicing if there are any more notes at a fret below the root fret
            dontGoBelowRootFret.value = true;
        }
        return;
    }
      

    private searchForFifthOfRoot(voicingNoteAdded: Map<string, boolean>) {
        // check for which note has been added. This will be the root because this should only ever be called once per voicing, after the root string.
        let rootNote: string = "";
        for (let note of voicingNoteAdded.keys()) {
            if (voicingNoteAdded.get(note) === true) {
                rootNote = note;
            }
        }
        const perfectFifthsMap = new Map<string, string>([
            ['C', 'G'], ['C#', 'G#'], ['D', 'A'], ['D#', 'A#'], ['E', 'B'], ['F', 'C'], ['F#', 'C#'], ['G', 'D'], ['G#', 'D#'], ['A', 'E'], ['A#', 'F'], ['B', 'F#']
        ]);
        const flatFifthsMap = new Map<string, string>([
            ['C', 'F#'], ['C#', 'G'], ['D', 'G#'], ['D#', 'A'], ['E', 'A#'], ['F', 'B'], ['F#', 'C'], ['G', 'C#'], ['G#', 'D'], ['A', 'D#'], ['A#', 'E'], ['B', 'F']
        ]);
        const sharpFifthsMap = new Map<string, string>([
            ['C', 'G#'], ['C#', 'A'], ['D', 'A#'], ['D#', 'B'], ['E', 'C'], ['F', 'C#'], ['F#', 'D'], ['G', 'D#'], ['G#', 'E'], ['A', 'F'], ['A#', 'F#'], ['B', 'G']
        ]);
        // now find the perfect fifth of the rootNote, if it is a note that exists in voicingNoteAdded, return that note.
        const perfectFifth = perfectFifthsMap.get(rootNote);
        if (perfectFifth !== undefined && voicingNoteAdded.has(perfectFifth)){
            return perfectFifth;
        }
        // if the perfect fifth was not found, check if the flat fifth exists in voicingNoteAdded, and return that note.
        const flatFifth = flatFifthsMap.get(rootNote);
        if (flatFifth !== undefined && voicingNoteAdded.has(flatFifth)){
            return flatFifth;
        }
        // if neither the perfect fifth nor the flat fifth was found, try the sharp fifth. Return the sharp fifth if it is found in voicingNoteAdded
        const sharpFifth = sharpFifthsMap.get(rootNote);
        if (sharpFifth !== undefined && voicingNoteAdded.has(sharpFifth)){
            return sharpFifth;
        }
        // return "None" if no fifth could be found
        return "None";
    }

    private isFifthOnOpenString(nthString: number, rootFret: number, voicingNoteAdded: Map<string, boolean>, whichStringNotes: string[][]): boolean { // checks the next two strings if the fifth (interval) is an open string (fret === 0)
        // the value passed to nthString should be the string that the root is on
        // the value passed to rootFret should be the fret number that the root is on, on the nthString
        // voicingNoteAdded should have one "true" value, the value for the key that represents the root note. Use this to find the correct fifth (interval)
        if (rootFret === 5 || rootFret === 10 || nthString > 1) { // to prevent this from returning true in the cases of Drop D tunings, and the fifth being on the 12th fret (an octave above open)
            return false
        }
        const fifth = this.searchForFifthOfRoot(voicingNoteAdded);
        if (whichStringNotes[nthString + 1][0] === fifth) {
            return true;
        }
        else if (whichStringNotes[nthString + 2][0] === fifth && voicingNoteAdded.size !== 2) { // Condition of voicingNoteAdded.size !== 2 is so only 1 string below is checked in the case of power chords
            return true;
        }
        return false;
    }

    private fretUsedMoreThanTwice(fretTimesUsed: Map<number, number>): boolean { // return true is a fret is used more than twice. Otherwise return false
        // parameter is a map keeping count of times each fret has been used. First number is the fret, the second number is the count.
        for (let fret of fretTimesUsed.keys()) {
            let count = fretTimesUsed.get(fret);
            if (count != undefined && count > 2) {
                return true;
            }
        }
        return false;
    }

    private getChordName(): string[] {
        let name = TonalChord.detect(this.NOTES);
        if (name.length === 0) {
            name = ["Unknown"];
        }
        return name;
    }

    public async determineVoicingsAndData(voice_param: string): Promise<CustomChordData> {
        let voicings: string[][] = [[""]];
        let voicingOne: string[] = this.voicing(this.NOTES, 0, this.stringNotes);
        let voicingTwo: string[] = this.voicing(this.NOTES, 1, this.stringNotes);
        let voicingThree: string[] = this.voicing(this.NOTES, 2, this.stringNotes);
        voicings = [voicingOne, voicingTwo, voicingThree];
        let junkData = new CustomChordData(
            voicings, // TABS: 2D array of random strings
            this.getChordName(),                     // NAMES: random string
            this.NOTES          // TONES: array of random musical notes
          );
          return junkData; 
    }
}
