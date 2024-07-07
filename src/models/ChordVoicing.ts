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
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"], //string6
        ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], //string5
        ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"], //string4
        ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"], //string3
        ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"], //string2
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]  //string1
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

    private checkForNotesToRemove(param1: string[], tonesParam: string): [string[], string[]] { //first element in return is the note names, second element is the note/string tabs, both as arrays
        const correctTones: string[] = tonesParam.split(",") //these are the tones to keep, all other tones should be removed from param1
        let tonesToCheck: string[] = param1;

        for (let i = 0; i < correctTones.length; i++) { //for consistency in how notes are written, convert all flats to their sharp equivalent. Ex: Eb -> D#
            switch(correctTones[i]) {
                case "Db":
                    correctTones[i] = "C#";
                    break;
                case "Eb":
                    correctTones[i] = "D#";
                    break;
                case "Gb":
                    correctTones[i] = "F#";
                    break;
                case "Ab":
                    correctTones[i] = "G#";
                    break;
                case "Bb":
                    correctTones[i] = "A#";
                    break;
                default:
                    break;
            }
        }
        
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