interface ChordData {
    STRINGS: string;
    FINGERING: string;
    CHORD_NAME: string;
    ENHARMONIC_CHORD_NAME: string;
    VOICING_ID: string;
    TONES: string;
}

export class UberChordAPI_data {
    private readonly CHORD_DATA: ChordData[];

    constructor(param: any[]) {
        this.CHORD_DATA = param.map(item => ({
            STRINGS: item.strings,
            FINGERING: item.fingering,
            CHORD_NAME: item.chordName,
            ENHARMONIC_CHORD_NAME: item.enharmonicChordName,
            VOICING_ID: item.voicingID,
            TONES: item.tones
        }));
    }

    public getStringsAsArray(): string[] {
        if (this.CHORD_DATA.length > 0) { //Ensure CHORD_DATA is not empty in case there is an issue with the API call
            let str = this.CHORD_DATA[0].STRINGS;
            return str.split(" ");
        }
        return [""];
    }

    public getStringsAsString(): string {
        if (this.CHORD_DATA.length > 0) {
            return this.CHORD_DATA[0].STRINGS;
        }
        return "";
    }

    public getChordNameAsArray(): string[] {
        if (this.CHORD_DATA.length > 0) { //Ensure CHORD_DATA is not empty in case there is an issue with the API call
            let str = this.CHORD_DATA[0].CHORD_NAME;
            return str.split(",");
        }
        return [""];
    }

    public getEnharmonicNameAsArray(): string[] {
        if (this.CHORD_DATA.length > 0) { //Ensure CHORD_DATA is not empty in case there is an issue with the API call
            let str = this.CHORD_DATA[0].ENHARMONIC_CHORD_NAME;
            return str.split(",");
        }
        return [""];
    }

    public getChordNameAsString(): string {
        if (this.CHORD_DATA.length > 0) {
            return this.CHORD_DATA[0].CHORD_NAME;
        }
        return "";
    }

    public getEnharmonicNameAsString(): string {
        if (this.CHORD_DATA.length > 0) {
            return this.CHORD_DATA[0].ENHARMONIC_CHORD_NAME;
        }
        return "";
    }

    public getTones(): string[] {
        if (this.CHORD_DATA.length > 0) {
            let str = this.CHORD_DATA[0].TONES;
            return str.split(",");
        }
        return [""];
    }

    public getDATA() {
        return this.CHORD_DATA;
    }

}