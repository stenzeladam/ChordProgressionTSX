interface NewChordData {
    TABS: string[];
    NAME: string;
    ENHARMONIC_NAME: string;
    TONES: string;
}

export class CustomChordData {
    private TABS: string[][];
    private NAME: string;
    private ENHARMONIC_NAME: string;
    private TONES: string[];
   
    constructor(tabsIn: string[][], nameIn: string, enharmIn: string, tonesIn: string[]) {
        this.TABS = tabsIn;
        this.NAME = nameIn;
        this.ENHARMONIC_NAME = enharmIn;
        this.TONES = tonesIn;
    }
   
    public getTabs(): string[][] {
        return this.TABS;
    }
    
    public getName(): string {
        return this.NAME;
    }

    public getFormattedName(): string {
        const nameArr: string[] = this.NAME.split(',');
        let tempName: string = ""
        for (let i = 0; i < nameArr.length; i++) {
            if (i === nameArr.length - 1 && nameArr[i] !== "") {
                tempName = tempName + "/" + nameArr[i];
            }
            else if (nameArr[i] === "Tritone") {
                tempName = tempName + ` ${nameArr[i]}`;
            }
            else {
                tempName = tempName + nameArr[i];
            }
        }

        let enharmName = this.getFormattedEnharmonicName();
        if (enharmName !== tempName) {
            tempName = `${tempName} (also ${enharmName})`;
        }
        return tempName;
    }

    public getFormattedEnharmonicName(): string {
        const nameArr: string[] = this.ENHARMONIC_NAME.split(',');
        let tempName: string = ""
        for (let i = 0; i < nameArr.length; i++) {
            if (i === nameArr.length - 1 && nameArr[i] !== "") {
                tempName = tempName + "/" + nameArr[i];
            }
            else if (nameArr[i] === "Tritone" || nameArr[i] === "unknown") {
                tempName = tempName + ` ${nameArr[i]}`;
            }
            else {
                tempName = tempName + nameArr[i];
            }
        }
        return tempName;
    }

    public getEnharmonicName(): string {
        return this.ENHARMONIC_NAME;
    }

    public getTones(): string[] {
        return this.TONES;
    }

    private convertTABStoStringArray(): string[] {
        let result: string[] = [];
        for (let i = 0; i < this.TABS.length; i++) {
            let tempTAB = this.TABS[i];
            let tempStr = "";
            for (let j = 0; j < tempTAB.length; j++) {
                if (j < tempTAB.length - 1) {
                    tempStr += tempTAB[j] + "-";
                }
                else (tempStr += tempTAB[j]);
            }
            result.push(tempStr);
        }
        return result;
    }

    private formatTONES(): string {
        // const EXPANSIONS: { [key: string]: string } = {
        //     "A#": "A#(Bb)",
        //     "C#": "C#(Db)",
        //     "D#": "D#(Eb)",
        //     "F#": "F#(Gb)",
        //     "G#": "G#(Ab)"
        // };

        let result = "";

        for (let i = 0; i < this.TONES.length; i++) {
            //const tone = EXPANSIONS[this.TONES[i]] || this.TONES[i];
            const tone = this.TONES[i];
            result += tone;
            if (i < this.TONES.length - 1) {
                result += ", ";
            }
        }
        
        return result;
    }

    public getData(): NewChordData {
        const tempName = this.getFormattedName();
        const tempEnharmName = this.getFormattedEnharmonicName();
        let tabsArray = this.convertTABStoStringArray();
        let formattedTones: string = this.formatTONES();
        return {
            TABS: tabsArray,
            NAME: tempName,
            ENHARMONIC_NAME: tempEnharmName,
            TONES: formattedTones
        }
    }
}