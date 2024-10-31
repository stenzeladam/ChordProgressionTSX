interface NewChordData {
    TABS: string[];
    NAMES: string[];
    TONES: string;
}

export class CustomChordData {
    private TABS: string[][];
    private NAMES: string[];
    private TONES: string[];
   
    constructor(tabsIn: string[][], namesIn: string[], tonesIn: string[]) {
        this.TABS = tabsIn;
        this.NAMES = namesIn;
        this.TONES = tonesIn;
    }
   
    public getTabs(): string[][] {
        return this.TABS;
    }
    
    public getName(): string[] {
        return this.NAMES;
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
            const tone = this.TONES[i];
            result += tone;
            if (i < this.TONES.length - 1) {
                result += ", ";
            }
        }
        
        return result;
    }

    /**
     * This function processes an array of chord names (`NAMES`) and performs several transformations:
     * 1. Removes "M" (Major) from the chord names, if present.
     * 2. Replaces "m7b5" with "ø" (half-diminished symbol).
     * 3. Replaces "dim" with "°" (diminished symbol).
     * 4. Replaces "o" with "dim" and adds an alternative version with "°".
     * 5. Replaces 'b' with '♭' (flat symbol).
     * 6. Skips transformations if the name is any form of "Unknown".
     *
     * @returns The transformed array of chord names.
     */
    private formatNAMES(): string[] {
        for (let i = 0; i < this.NAMES.length; i++) {
            let name = this.NAMES[i];

            // Skip processing if the name is any form of "Unknown".
            if (/^Unknown/i.test(name)) {
                continue;
            }

            // Remove "M" from the chord name if it's at index 1, or after a "#".
            if (name[1] === 'M' || (name[1] === '#' && name[2] === 'M')) {
                if (name[1] === 'M') {
                    this.NAMES[i] = name.slice(0, 1) + name.slice(2);
                } else if (name[1] === '#' && name[2] === 'M') {
                    this.NAMES[i] = name.slice(0, 2) + name.slice(3);
                }
            }

            // Replace "m7b5" with the half-diminished symbol "ø".
            if (name.includes("m7b5")) {
                const newName = name.replace("m7b5", "ø");
                this.NAMES.splice(i + 1, 0, newName); // Insert the new name after the current one.
                i++; // Skip the newly added name.
            }

            // Replace "dim" with the diminished symbol "°".
            if (name.includes("dim")) {
                const newName = name.replace("dim", "°");
                this.NAMES.splice(i + 1, 0, newName);
                i++; // Skip the newly added name.
            }

            // If "o" is used for diminished, replace it with "dim" and also add "°".
            if (name.includes("o")) {
                const dimName = name.replace("o", "dim");
                this.NAMES[i] = dimName; // Replace the original name with "dim".

                const correctDimName = name.replace("o", "°");
                this.NAMES.splice(i + 1, 0, correctDimName); // Insert the name with "°".
                i++; // Skip the newly added name.
            }

            // Replace any 'b' with the flat symbol '♭'.
            this.NAMES[i] = this.NAMES[i].replace(/b/g, "♭");
        }

        return this.NAMES;
    }

    public getData(): NewChordData {
        let tabsArray = this.convertTABStoStringArray();
        let formattedTones: string = this.formatTONES();
        let formattedNames: string[] = this.formatNAMES();
        return {
            TABS: tabsArray,
            NAMES: formattedNames,
            TONES: formattedTones
        }
    }
}