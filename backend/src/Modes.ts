export class Modes {
    private readonly ROOT: string;
    private readonly CHROMATIC: string[];
    private scale: string[] = [];

    constructor(root_param: string, mode_param: string) {
        this.ROOT = root_param;
        switch (this.ROOT) {
            case "C":
                this.CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                break;
            case "C#":
                this.CHROMATIC = ["C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"];
                break;
            case "D":
                this.CHROMATIC = ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"];
                break;
            case "D#":
                this.CHROMATIC = ["D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"];
                break;
            case "E":
                this.CHROMATIC = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"];
                break;
            case "F":
                this.CHROMATIC = ["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"];
                break;
            case "F#":
                this.CHROMATIC = ["F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F"];
                break;
            case "G":
                this.CHROMATIC = ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"];
                break;
            case "G#":
                this.CHROMATIC = ["G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"];
                break;
            case "A":
                this.CHROMATIC = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
                break;
            case "A#":
                this.CHROMATIC = ["A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"];
                break;
            case "B":
                this.CHROMATIC = ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"];
                break;
            default:
                this.CHROMATIC = ["ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR"];
                break;
        }

        this.applyMode(mode_param);
    }

    private applyMode(mode: string) {
        switch(mode) {
            case "Ionian":
                this.ionian();
                break;
            case "Dorian":
                this.dorian();
                break;
            case "Phrygian":
                this.phrygian();
                break;
            case "Lydian":
                this.lydian();
                break;
            case "Mixolydian":
                this.mixolydian();
                break;
            case "Aeolian":
                this.aeolian();
                break;
            case "Locrian":
                this.locrian();
                break;
            case "Harmonic Minor":
                this.harmonicMinor();
                break;
            case "Double Harmonic Major":
                this.doubleHarmonicMajor();
                break;
            default:
                break;
        }
    }

    private harmonicMinor(): void {
        this.scale = ["", "", "", "", "", "", ""];  
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 1 && i != 4 && i != 5) {  // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else if (i == 5) {                  // 1.5 step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
                j++;
            }
            else {                              // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    private doubleHarmonicMajor(): void {
        this.scale = ["", "", "", "", "", "", ""];  
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            if (i === 0 || i === 2 || i === 4) {
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
            else if (i === 1 || i === 5) {
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
                j++;
            }
            else {
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
        }
    }

    private ionian(): void {
        this.scale = ["", "", "", "", "", "", ""];
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 2) {               // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    private dorian(): void {
        this.scale = ["", "", "", "", "", "", ""];
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 1 && i != 5) {               // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    private phrygian(): void {
        this.scale = ["", "", "", "", "", "", ""];
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 0 && i != 4) {               // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    private lydian(): void {
        this.scale = ["", "", "", "", "", "", ""];
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 3) {               // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    private mixolydian(): void {
        this.scale = ["", "", "", "", "", "", ""];
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 2 && i != 5) {               // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    private aeolian(): void {
        this.scale = ["", "", "", "", "", "", ""];  
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 1 && i != 4) {               // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    private locrian(): void {
        this.scale = ["", "", "", "", "", "", ""];
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 0 && i != 3) {               // whole step
                this.scale[i] = this.CHROMATIC[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this.CHROMATIC[j];
                j++;
            }
        }
    }

    public getRoot(): string {
        return this.ROOT;
    }

    public getChromatic(): string[] {
        return this.CHROMATIC;
    }

    public getScale(): string[] {
        return this.scale;
    }

    public getModeMembers() {
        return { root: this.ROOT, chromatic: this.CHROMATIC, scale: this.scale };
    } 
}