class Modes {
    private readonly _root: string;
    private readonly _chromatic: string[];
    private scale: string[] = [];

    constructor(root_param: string) {
        this._root = root_param;
        switch (this._root) {
            case "C":
                this._chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                break;
            case "C#":
                this._chromatic = ["C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"];
                break;
            case "D":
                this._chromatic = ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"];
                break;
            case "D#":
                this._chromatic = ["D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"];
                break;
            case "E":
                this._chromatic = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"];
                break;
            case "F":
                this._chromatic = ["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"];
                break;
            case "F#":
                this._chromatic = ["F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F"];
                break;
            case "G":
                this._chromatic = ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"];
                break;
            case "G#":
                this._chromatic = ["G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"];
                break;
            case "A":
                this._chromatic = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
                break;
            case "A#":
                this._chromatic = ["A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"];
                break;
            case "B":
                this._chromatic = ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"];
                break;
            default:
                this._chromatic = ["ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR", "ERR"];
                break;
        }
    }

    public applyMode(mode: string) {
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
            default:
                break;
        }
    }

    private ionian(): void {
        this.scale = Array(7).fill("");
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 2) {               // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    }

    private dorian(): void {
        this.scale = Array(7).fill("");
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 1 && i != 5) {               // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    }

    private phrygian(): void {
        this.scale = Array(7).fill("");
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 0 && i != 4) {               // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    }

    private lydian(): void {
        this.scale = Array(7).fill("");
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 3) {               // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    }

    private mixolydian(): void {
        this.scale = Array(7).fill("");
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 2 && i != 5) {               // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    }

    private aeolian(): void {
        this.scale = Array(7).fill("");        
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 1 && i != 4) {               // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    }

    private locrian(): void {
        this.scale = Array(7).fill("");
        let j = 0;
        for (let i = 0; i < this.scale.length; i++) {
            
            if (i != 0 && i != 3) {               // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else {                      // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    }

    public getScale(): string[] {
        return this.scale;
    }

    public getChromatic(): string[] {
        return this._chromatic;
    }

    public getRoot(): string {
        return this._root;
    }
}