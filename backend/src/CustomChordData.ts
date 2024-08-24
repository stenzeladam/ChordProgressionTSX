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
            else if (nameArr[i] === "Tritone" || nameArr[i] === "unknown") {
                tempName = tempName + ` ${nameArr[i]}`;
            }
            else if (i < nameArr.length - 1
                && /\d$/.test(nameArr[i])  // Last character of nameArr[i] is a number
                && /^\d/.test(nameArr[i+1]) // First character of nameArr[i+1] is a number
                && nameArr[i+1] !== "") {  // Next element is not empty
                    // Extract numeric prefix and remaining part from nameArr[i+1]
                    const match = nameArr[i+1].match(/^(\d+)(.*)$/);
                    const numericPrefix = match ? match[1] : ""; // Numeric part
                    const remainingPart = match ? match[2] : ""; // Remaining part
                    
                    tempName = tempName + `${nameArr[i]}(add${numericPrefix}${remainingPart})`;
                    i++; // Skip the next element as it has been processed
            }
            else if (nameArr[i] === "dim") {
                if (i < nameArr.length - 1) {
                    if (nameArr[i+1] === "") {
                        // Next element is blank, leave "dim" as is
                        tempName = tempName + "dim";
                    } else if (/^\D/.test(nameArr[i+1])) {
                        // Next element starts with a non-numeric character, replace "dim" with "°"
                        tempName = tempName + "°";
                    } else {
                        // If none of the above conditions are met, keep "dim" as is
                        tempName = tempName + "dim";
                    }
                } else {
                    // If there is no next element, keep "dim" as is
                    tempName = tempName + "dim";
                }
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
            else if (i < nameArr.length - 1
                && /\d$/.test(nameArr[i])  // Last character of nameArr[i] is a number
                && /^\d/.test(nameArr[i+1]) // First character of nameArr[i+1] is a number
                && nameArr[i+1] !== "") {  // Next element is not empty
                    // Extract numeric prefix and remaining part from nameArr[i+1]
                    const match = nameArr[i+1].match(/^(\d+)(.*)$/);
                    const numericPrefix = match ? match[1] : ""; // Numeric part
                    const remainingPart = match ? match[2] : ""; // Remaining part
                    
                    tempName = tempName + `${nameArr[i]}(add${numericPrefix}${remainingPart})`;
                    i++; // Skip the next element as it has been processed
            }
            else if (nameArr[i] === "dim") {
                if (i < nameArr.length - 1) {
                    if (nameArr[i+1] === "") {
                        // Next element is blank, leave "dim" as is
                        tempName = tempName + "dim";
                    } else if (/^\D/.test(nameArr[i+1])) {
                        // Next element starts with a non-numeric character, replace "dim" with "°"
                        tempName = tempName + "°";
                    } else {
                        // If none of the above conditions are met, keep "dim" as is
                        tempName = tempName + "dim";
                    }
                } else {
                    // If there is no next element, keep "dim" as is
                    tempName = tempName + "dim";
                }
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