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
    private readonly _compensateTuning: boolean;
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
        this._compensateTuning = param_compensate;
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
            //console.log(6 - nthString, "string: ", this.stringNotes[nthString]);
        }
        //console.log(this.convertNotesToVoicing());
        this.fetchChordDataByVoicing(this.convertNotesToVoicing())
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

    public async fetchChordDataByVoicing(voice_param: string): Promise<ChordData[]> {
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