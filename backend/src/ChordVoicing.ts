import { UberChordAPI_data } from "./UberChordAPI_data";

interface ChordData {
    STRINGS: string;
    FINGERING: string;
    CHORD_NAME: string;
    ENHARMONIC_CHORD_NAME: string;
    VOICING_ID: string;
    TONES: string;
}

export class ChordVoicing {
    private notes: string[];
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
        this.notes = param_notes;
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

    public convertNotesToVoicing(): string {

        const numOfNotesInChord = this.notes.length;
        let tabsFrets: string[] = ["X","X","X","X","X","X"];
        
        for (let nthString = 0; nthString < numOfNotesInChord; nthString++) {
            let currentString = this.stringNotes[nthString];
            let size = currentString.length;
            let fret = 0;
            while (currentString[fret] != this.notes[nthString] && fret < currentString.length) {
                fret++;
            }
            tabsFrets[nthString] = fret.toString();
        }

        let voicing:string = "";
        for(let i = 0; i < 6; i++) {
            if (i < 5) {
                voicing = voicing + tabsFrets[i] + "-";
            }
            else {
                voicing = voicing + tabsFrets[i];
            }
        }
        //console.log(voicing);
        return voicing;
    }

    private convertNotesToVoicingArray(param: string[]): string[] {

        let tabsFrets: string[] = ["X","X","X","X","X","X"];
        
        for (let nthString = 0; nthString < tabsFrets.length; nthString++) {
            let currentString = this.stringNotes[nthString];
            let fret = 0;
            while (param[nthString] != currentString[fret] && fret < currentString.length) {
                fret++;
            }
            tabsFrets[nthString] = fret.toString();
        }
        return tabsFrets;
    }

    public convertNotesToVoicingStandard(): string {

        const numOfNotesInChord = this.notes.length;
        let tabsFrets: string[] = ["X","X","X","X","X","X"];
        
        for (let nthString = 0; nthString < numOfNotesInChord; nthString++) {
            let currentString = this.STANDARD[nthString];
            let fret = 0;
            while (currentString[fret] != this.notes[nthString] && fret < currentString.length) {
                fret++;
            }
            tabsFrets[nthString] = fret.toString();
        }

        let voicing:string = "";
        for(let i = 0; i < 6; i++) {
            if (i < 5) {
                voicing = voicing + tabsFrets[i] + "-";
            }
            else {
                voicing = voicing + tabsFrets[i];
            }
        }
        //console.log("STANDARD: ", voicing);
        return voicing;
    }

    private convertVoicingToNotesArray(param: string): string[] {
        let fretTabsStr = param.split(" ");
        let notesArr: string[] = [];
        let fretNumber = 0
        for (let i = 0; i < fretTabsStr.length; i++) {
            let tunedStringNotes = this.stringNotes[i]; //Check each string, from lowest to highest, for the notes at each fret number in fretTabsStr
            if (fretTabsStr[i] != "X") {
                fretNumber = parseInt(fretTabsStr[i]);
                notesArr.push(tunedStringNotes[fretNumber]);
            }
            else {
                notesArr.push("X");
            }
        }
        return notesArr;
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

    private checkForNotesToRemove(param1: string[], tonesParam: string): [string[], string[]] { //first element in return is the note names, second element is the note/string tabs, both as arrays
        const correctTones = this.convertFlatsToSharps(tonesParam.split(",")); //these are the tones to keep, all other tones should be removed from param1
        let tonesToCheck: string[] = param1;
        
        let indicesNeedReplacing: boolean[] = Array(tonesToCheck.length).fill(false);

        for (let i = 0; i < tonesToCheck.length; i++) {
            if (tonesToCheck[i] == "X") { //Nothing to replace
                //continue;
            }
            else {
                let replaceFlag = true;
                for (let j = 0; j < correctTones.length; j++) { //check the entire correctNotes array to see if tonesToCheck[i] belongs
                    if (tonesToCheck[i] === correctTones[j]) {
                        replaceFlag = false;
                    }
                }
                if (replaceFlag) { //Need to replace these notes either with the nearest available note, within 2 frets below or 3 frets above, or an "X" if no such note is available.
                    indicesNeedReplacing[i] = true; //Mark index for needing replacement
                }
            }
        }
        let voice = this.convertNotesToVoicingArray(tonesToCheck);
        return this.replaceNotes(tonesToCheck, correctTones, indicesNeedReplacing, voice);
    }

    private replaceNotes(param: string[], correctNotesParam: string[], indices: boolean[], voice_arr: string[]): [string[], string[]] {
        let notes: string[] = param;
        let voicingArray = voice_arr;
        const correctNotes = correctNotesParam;
        for (let i = 0; i < indices.length; i++) {
            let currentNote = notes[i]; 
            let currentFret: number;
            let noteFixed: boolean = false;
            if (indices[i]) { //if the index is marked true for replacement, then notes[i] needs to be replaced. i is also the nthString to check (Ex: if i = 0, check the lowest string/6th string)
                for (let j = 0; (j < this.stringNotes[i].length) && !noteFixed; j++) { //first check the string to find any of the notes in correctNotesParam. 
                    if (currentNote == this.stringNotes[i][j]) {
                        currentFret = j; //marking the fret number of the incorrect note, so the distance to the nearest correct note can be calculated;
                        const offsets = [1, -1, 2, -2, 3] // the order of frets to check, ie 1 fret above, then 1 below, then 2 above...etc
                        for (const offset of offsets) {
                            let above12thFret: boolean = false;
                            let k = (j + offset) % this.stringNotes[i].length; //check one fret above. The % this.stringNotes[i].length is in case j is at the 11th fret, it will check the 12th fret and above, as the 12th fret note will be the same as the 0 index note.
                            if (k >= 0) { //Cannot have a negative fret
                                if (j + offset >= this.stringNotes[i].length) {
                                    above12thFret = true;
                                }
                                for (let element = 0; element < correctNotes.length; element++) { //check each element in correctNotes to see if this.stringNotes[i][k] is a correct note
                                    if (this.stringNotes[i][k] === correctNotes[element]) {
                                        notes[i] = "(" + correctNotes[element] + ")";
                                        if (above12thFret) {
                                            currentFret = 12 + k;
                                            voicingArray[i] = "(" + currentFret.toString() + ")";
                                            noteFixed = true;
                                            break;
                                        }
                                        else {
                                            currentFret = k;
                                            voicingArray[i] = "(" + currentFret.toString() + ")";
                                            noteFixed = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (noteFixed) {
                                break;
                            } 
                        }
                        if (!noteFixed) {
                            notes[i] = "(X)";
                            voicingArray[i] = "(X)";
                            noteFixed = true;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < notes.length; i++) {
            if (notes[i] === "X") {
                voicingArray[i] = "X";
            }
            else if (notes[i] === "(X)") {
                voicingArray[i] = "(X)";
            }
        }

        return [notes, voicingArray];
    }

    private voicing(param: string[]): string[]  {
        // Create up to three voicings given the notes. 
        let voicing: string[] = ["X", "X", "X", "X", "X", "X"];

        //TODO: instead of having the method create three seperate voicings, have it create a single voicing where the root string is specified in a function parameter
        //      the idea is that the method will be called three times with different root strings to get 3 different voicings
        //      this will make the method significantly easier to understand and way less jumbled. Temporarily commented out sections relating to other voicings

        //let voicingTwo: string[] = ["X", "X", "X", "X", "X", "X"];
        //let voicingThree: string[] = ["X", "X", "X", "X", "X", "X"];
        //const chordNotes: string[] = this.convertFlatsToSharps(param); ***CORRECT ONE TO USE FOR CODE***

        const chordNotes: string[] = ["F", "A", "C"] // ***TESTING PURPOSES ONLY***

        console.log("Chord Notes: ", chordNotes);

        if (param.length < 3) {
            return ["ERROR", "ERROR", "ERROR"];
        }

        let voicingNoteAdded: Map<string, boolean> = new Map(); //hashmap to check if note has been added to voicing, so notes not added yet can be prioritized
        //let voicingTwoNoteAdded: Map<string, boolean> = new Map();
        //let voicingThreeNoteAdded: Map<string, boolean> = new Map();
        
        for (let i = 0; i < chordNotes.length; i++) {
            voicingNoteAdded.set(chordNotes[i], false);
           // voicingTwoNoteAdded.set(chordNotes[i], false);
           // voicingTwoNoteAdded.set(chordNotes[i], false);
        }
        //console.log(voicingOneNoteAdded);

        //find the root note on the 6th string
        for (let fret = 0; fret < 12; fret++) {
            if (this.stringNotes[0][fret] === chordNotes[0]) {
                voicing[0] = fret.toString();
                voicingNoteAdded.set(chordNotes[0], true);
            }
            // if (this.stringNotes[1][fret] === chordNotes[0]) {
            //     voicingTwo[1] = fret.toString();
            //     voicingTwoNoteAdded.set(chordNotes[0], true);
            // }
            // if (this.stringNotes[2][fret] === chordNotes[0]) {
            //     voicingThree[2] = fret.toString();
            //     voicingThreeNoteAdded.set(chordNotes[0], true);
            // }
        }

        // try to find the next best note on the next string for each voicing
        // Give priority to finding the 5th (in most cases, chordNotes[2]) on the next string for each voicing. 
        // Check up to four frets above, or two frets below.
        const voicingRootFret: number = parseInt(voicing[0], 10); //to ensure the integer is of base 10
        //const voicingTwoRootFret: number = parseInt(voicingTwo[1], 10);
        //const voicingThreeRootFret: number = parseInt(voicingThree[2], 10);
        
        //for voicingOne, check stringNotes[1][voicingOneRootFret] for the 5th
        const fretOffsets = [0, 2, 1, -1, -2, 3, 4]; // the order of frets to check, ie 0, then 2 frets above, then 1 above, then 1 below...etc
        let voicing_MoreThanTwoAbove: boolean = false; //if the offset is more than 2 frets above, do not check below the root fret, as the fingering would be too difficult to play
        //let voicingTwo_MoreThanTwoAbove: boolean = false;
        //let voicingThree_MoreThanTwoAbove: boolean = false;
        let voicingString5: boolean = false;
        for (let i of fretOffsets) {
            let tempFret = voicingRootFret + i;
            if (tempFret >= 0) {
                let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
                if (this.stringNotes[1][x] === chordNotes[2]) {
                    voicing[1] = tempFret.toString();
                    voicingNoteAdded.set(chordNotes[2], true);
                    voicingString5 = true;
                    if (i > 2) {
                        voicing_MoreThanTwoAbove = true;
                    }
                }
            }
            // tempFret  = voicingTwoRootFret + i;
            // if (tempFret >= 0) {
            //     let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
            //     if (this.stringNotes[2][x] === chordNotes[2]) {
            //         voicingTwo[2] = tempFret.toString();
            //         voicingTwoNoteAdded.set(chordNotes[2], true);
            //         if (i > 2) {
            //             voicingTwo_MoreThanTwoAbove = true;
            //         }
            //     }
            // }
            // tempFret  = voicingThreeRootFret + i;
            // if (tempFret >= 0) {
            //     let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
            //     if (this.stringNotes[3][x] === chordNotes[2]) {
            //         voicingThree[3] = tempFret.toString();
            //         voicingThreeNoteAdded.set(chordNotes[2], true);
            //         if (i > 2) {
            //             voicingThree_MoreThanTwoAbove = true;
            //         }
            //     }
            // }
        }

        // if chordNotes[2] was not found on the next string for any of these voicings, search for any notes within range
        // first prioritize searching for any notes that haven't been added yet
    
        for (let note of voicingNoteAdded.keys()) {
            if (voicingString5) { //once a suitable note on the string has been found
                break;
            }
            if (voicingNoteAdded.get(note) === false) { // if true, then the key/note has not been added and should be searched for on this string
                for (let i of fretOffsets) {
                    if (!voicing_MoreThanTwoAbove || (voicing_MoreThanTwoAbove && i >= 0)) { //don't check frets below the root fret if there is one note in the voicing that is at least two frets above the root fret
                        let tempFret = voicingRootFret + i;
                        if (tempFret >= 0) {
                            let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
                            if (this.stringNotes[1][x] === note) {
                                voicing[1] = tempFret.toString();
                                voicingNoteAdded.set(note, true);
                                voicingString5 = true;
                                if (i > 2) {
                                    voicing_MoreThanTwoAbove = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        // voicingOne, String5 will remain an "X" if no suitable note can be found. 

        // for voicingOne, now check string4 for any suitable note, prioritizing notes not yet found.
        let voicingOneString4: boolean = false;
        for (let note of voicingNoteAdded.keys()) {
            if (voicingOneString4) { //once a suitable note on the string has been found
                break;
            }
            if (voicingNoteAdded.get(note) === false) { // if true, then the key/note has not been added and should be searched for on this string
                for (let i of fretOffsets) {
                    if (!voicing_MoreThanTwoAbove || (voicing_MoreThanTwoAbove && i >= 0)) { //don't check frets below the root fret if there is one note in the voicing that is at least two frets above the root fret
                        let tempFret = voicingRootFret + i;
                        if (tempFret >= 0) {
                            let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
                            if (this.stringNotes[2][x] === note) {
                                voicing[2] = tempFret.toString();
                                voicingNoteAdded.set(note, true);
                                voicingOneString4 = true;
                                if (i > 2) {
                                    voicing_MoreThanTwoAbove = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!voicingOneString4) { //If none of the unassigned notes are suitable for this string, check the notes that have been assigned
            for (let note of voicingNoteAdded.keys()) {
                if (voicingOneString4) { //once a suitable note on the string has been found
                    break;
                }
                if (voicingNoteAdded.get(note) === true) { // if true, then the key/note has already been added and should be searched for on this string
                    for (let i of fretOffsets) {
                        if (!voicing_MoreThanTwoAbove || (voicing_MoreThanTwoAbove && i >= 0)) { //don't check frets below the root fret if there is one note in the voicing that is at least two frets above the root fret
                            let tempFret = voicingRootFret + i;
                            if (tempFret >= 0) {
                                let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
                                if (this.stringNotes[2][x] === note) {
                                    voicing[2] = tempFret.toString();
                                    voicingNoteAdded.set(note, true);
                                    voicingOneString4 = true;
                                    if (i > 2) {
                                        voicing_MoreThanTwoAbove = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        console.log("voicing: ", voicing)
        //console.log("voicingTwo: ", voicingTwo)
        //console.log("voicingThree: ", voicingThree)
        console.log(voicingNoteAdded);

        // If there are 5 notes or more, only two voicings are needed.
        // If there are 6 notes, only one voicing is needed.
        // Create an optimal voicing that starts on the 6th string, then an optimal voicing that starts on the 5th string, 
        // and an optimal vocing that starts on the 4th string.

        // Check for first note in notes array, then prioritize finding the notes mostly sequentially
        // prioritize finding the fifth, flat 5th, then the fourth, then the third if possible. Also prioritize any notes that 
        // have not been assigned yet. Example: A_add9 should return 5-7-9-6-5-5
        // Find A on the 6th string. 5th fret
        // then check the 5th string for the 5th, which is E. The fret needs to be within 4 frets above or 2 frets below, alternating checks
        // if the note is more than 2 frets above, then can't check any notes below root fret
        // if the 5th is not there,

        return param;
    }

    private checkStringForNotes() {
        // for voicingOne, now check string4 for any suitable note, prioritizing notes not yet found.
        // let voicingOneString4: boolean = false;
        // for (let note of voicingOneNoteAdded.keys()) {
        //     if (voicingOneString4) { //once a suitable note on the string has been found
        //         break;
        //     }
        //     if (voicingOneNoteAdded.get(note) === false) { // if true, then the key/note has not been added and should be searched for on this string
        //         for (let i of fretOffsets) {
        //             if (!voicingOne_MoreThanTwoAbove || (voicingOne_MoreThanTwoAbove && i >= 0)) { //don't check frets below the root fret if there is one note in the voicing that is at least two frets above the root fret
        //                 let tempFret = voicingOneRootFret + i;
        //                 if (tempFret >= 0) {
        //                     let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
        //                     if (this.stringNotes[2][x] === note) {
        //                         voicingOne[2] = tempFret.toString();
        //                         voicingOneNoteAdded.set(note, true);
        //                         voicingOneString4 = true;
        //                         if (i > 2) {
        //                             voicingOne_MoreThanTwoAbove = true;
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // if (!voicingOneString4) { //If none of the unassigned notes are suitable for this string, check the notes that have been assigned
        //     for (let note of voicingOneNoteAdded.keys()) {
        //         if (voicingOneString4) { //once a suitable note on the string has been found
        //             break;
        //         }
        //         if (voicingOneNoteAdded.get(note) === true) { // if true, then the key/note has already been added and should be searched for on this string
        //             for (let i of fretOffsets) {
        //                 if (!voicingOne_MoreThanTwoAbove || (voicingOne_MoreThanTwoAbove && i >= 0)) { //don't check frets below the root fret if there is one note in the voicing that is at least two frets above the root fret
        //                     let tempFret = voicingOneRootFret + i;
        //                     if (tempFret >= 0) {
        //                         let x = tempFret % 12; //use (fret % 12) to find notes above the 12th fret
        //                         if (this.stringNotes[2][x] === note) {
        //                             voicingOne[2] = tempFret.toString();
        //                             voicingOneNoteAdded.set(note, true);
        //                             voicingOneString4 = true;
        //                             if (i > 2) {
        //                                 voicingOne_MoreThanTwoAbove = true;
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    private mergeChordData(param1: UberChordAPI_data, param2: UberChordAPI_data): UberChordAPI_data {
        // param1 should be the object created with the normal voicing function
        // param2 should be the object created with the standard tuning voicing function

        let strings = param1.getDATA()[0].STRINGS;
        let fingering = param1.getDATA()[0].FINGERING;
        let chordName = param2.getDATA()[0].CHORD_NAME;
        let enharmonicChordName = param2.getDATA()[0].ENHARMONIC_CHORD_NAME;
        let voicing_ID = param1.getDATA()[0].VOICING_ID;
        let tones = param2.getDATA()[0].TONES;

        // convert stings to an array of notes based upon the selected-tuning array (not the constant standard tuning array), and then check to see if any of these notes are not present in tones.
        let strArr: string[] = this.convertVoicingToNotesArray(strings);
        let x = this.voicing(this.getTonesAsArray(tones));
        //console.log(strArr);
        let correctedVoicingTab: string[] = this.checkForNotesToRemove(strArr, tones)[1];
        strings = ""
        for (let i = 0; i < correctedVoicingTab.length; i++) {
            if (i < correctedVoicingTab.length - 1) {
                strings = strings + correctedVoicingTab[i] + " ";
            }
            else {
                strings = strings + correctedVoicingTab[i];
            }
            
        }
        const mergedData = new UberChordAPI_data([{strings, fingering, chordName, enharmonicChordName, voicing_ID, tones}]);
        return mergedData;
    }

    private getTonesAsArray(tones: string): string[] {
        return tones.split(',');
    }

    public async fetchChordDataByVoicing(voice_param: string): Promise<UberChordAPI_data | null> {
        const voicing = voice_param;
        const url = `https://api.uberchord.com/v1/chords?voicing=${voicing}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            let call = new UberChordAPI_data(data);
            let chordName = call.getEnharmonicNameAsArray()
            let enharmonicData = await this.fetchChordDataByEnharmonicName(chordName);
            call = new UberChordAPI_data(enharmonicData); //Normal data

            if (this.COMPENSATE_TUNING) {
                const standardVoicing = this.convertNotesToVoicingStandard();
                const data2 = await this.fetchChordDataByStandardVoicing(standardVoicing);
                let call2 = new UberChordAPI_data(data2); //Standard tuning data
                // console.log("call: ", call);
                // console.log("call2: ", call2);
                const mergedData = this.mergeChordData(call, call2);
                return mergedData;
            }
            return call;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        return null;
    }

    public async fetchChordDataByStandardVoicing(voice_param: string): Promise<ChordData[]> {
        const voicing = voice_param;
        const url = `https://api.uberchord.com/v1/chords?voicing=${voicing}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    public async fetchChordDataByEnharmonicName(name_param: string[]): Promise<ChordData[]> {
        let chordName;

        try {
            chordName = name_param[0] + "_" + name_param[1] + name_param[2] + "_" + name_param[3];
        } catch (error) {
            console.error('Error with the enharmonic chord name', error);
            return [];
        }

        const url = `https://api.uberchord.com/v1/chords/${chordName}`;
                
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
}