export class Chord {
    private readonly _scale: string[];
    private readonly _chromatic: string[];
    private readonly _chordNum: number;
    private notes: string[] = [];
    private rootIndex: number = -999;
    private isFlat = false;
    private isSharp = false;
    private sus2 = false;
    private sus4 = false;
    private seventh = false;

    constructor(chordNumber: number, localScale: string[], localChrom: string[], Mods?: boolean[]) {
        this._scale = localScale;
        this._chromatic =localChrom;
        this._chordNum = chordNumber - 1; //because TypeScript starts indices at 0, but there is no 
                                         //"0" chord in a chord progression using Roman numerals. 
        if (Mods) {
            this.isFlat = Mods[0];
            this.isSharp = Mods[1];
            this.sus2 = Mods[2];
            this.sus4 = Mods[3];
            this.seventh = Mods[4];
        }
        for (let i = 0; i < 12; i++) {
            if (this._scale[this._chordNum] == this._chromatic[i]) { 
        		this.rootIndex = i;
        		if (this.isFlat) {
        			this.rootIndex = (this.rootIndex - 1) % this._chromatic.length;
        			if (this.rootIndex == -1) {
        				this.rootIndex = 11;
        			}
        		}
        		else if (this.isSharp) {
        			this.rootIndex = (this.rootIndex + 1) % this._chromatic.length;
        		}
        		break;
        	}
        }

        this.notes.push(this._chromatic[this.rootIndex]);
    }

    public getMinorSecond(): void {
        const minorSecond = (this.rootIndex + 1) % this._chromatic.length;
        this.notes.push(this._chromatic[minorSecond]);
    }

    public getMajorSecond(): void {
        const majorSecond = (this.rootIndex + 2) % this._chromatic.length;
        this.notes.push(this._chromatic[majorSecond]);
    }

    public getMinorThird(): void {
        const minorThird = (this.rootIndex + 3) % this._chromatic.length;
        this.notes.push(this._chromatic[minorThird]);
    }

    public getMajorThird(): void {
        const majorThird = (this.rootIndex + 4) % this._chromatic.length;
        this.notes.push(this._chromatic[majorThird]);
    }

    public getPerfectFourth(): void {
        const perfectFourth = (this.rootIndex + 5) % this._chromatic.length;
        this.notes.push(this._chromatic[perfectFourth]);
    }

    public getFlatFifth(): void {
        const flatFifth = (this.rootIndex + 6) % this._chromatic.length;
        this.notes.push(this._chromatic[flatFifth]);
    }

    public getPerfectFifth(): void {
        const perfectFifth = (this.rootIndex + 7) % this._chromatic.length;
        this.notes.push(this._chromatic[perfectFifth]);
    }

    public getMinorSixth(): void {
        const minorSixth = (this.rootIndex + 8) % this._chromatic.length;
        this.notes.push(this._chromatic[minorSixth]);
    }

    public getMajorSixth(): void {
        const majorSixth = (this.rootIndex + 9) % this._chromatic.length;
        this.notes.push(this._chromatic[majorSixth]);
    }

    public getMinorSeventh(): void {
        const minorSeventh = (this.rootIndex + 10) % this._chromatic.length;
        this.notes.push(this._chromatic[minorSeventh]);
    }

    public getMajorSeventh(): void {
        const majorSeventh = (this.rootIndex + 11) % this._chromatic.length;
        this.notes.push(this._chromatic[majorSeventh]);
    }

    public getOctave(): void {
        const octave = (this.rootIndex + 12) % this._chromatic.length;
        this.notes.push(this._chromatic[octave]);
    }

    public getMinorNinth(): void {
        const minorNinth = (this.rootIndex + 13) % this._chromatic.length;
        this.notes.push(this._chromatic[minorNinth]);
    }

    public getMajorNinth(): void {
        const majorNinth = (this.rootIndex + 14) % this._chromatic.length;
        this.notes.push(this._chromatic[majorNinth]);
    }

    public getEleventh(): void {
        const eleventh = (this.rootIndex + 17) % this._chromatic.length;
        this.notes.push(this._chromatic[eleventh]);
    }

    public getMinorThirteenth(): void {
        const minorThirteenth = (this.rootIndex + 20) % this._chromatic.length;
        this.notes.push(this._chromatic[minorThirteenth]);
    }

    public getMajorThirteenth(): void {
        const majorThirteenth = (this.rootIndex + 21) % this._chromatic.length;
        this.notes.push(this._chromatic[majorThirteenth]);
    }

    public getThird(): void {
        const third = (this._chordNum + 2) % this._scale.length;
        this.notes.push(this._scale[third]);
    }

    public getFifth(): void {
        const fifth = (this._chordNum + 4) % this._scale.length;
        this.notes.push(this._scale[fifth]);
    }

    public buildChord(): void {
        if (!this.sus2 && !this.sus4) {
            this.getThird();
        } else if (this.sus2) {
            this.getMajorSecond();
        } else if (this.sus4) {
            this.getPerfectFourth();
        }
        this.getFifth();
        if (this.seventh) {
            const sev = (this._chordNum + 6) % this._scale.length;
            this.notes.push(this._scale[sev]);
        }
    }

    public getNotes(): string[] {
        return this.notes;
    }

    public getNotes_String(): string {
        let str = "[ ";
        for (let i = 0; i < this.notes.length; i++) {
            if ((i < this.notes.length - 1) && this.notes[i]) {
                str = str + this.notes[i] + ", ";
            }
            else if (this.notes[i]) {
                str = str + this.notes[i] + " ]";
            }
        }
        return str;
    }
}