interface ChordModifications {
  sus2: boolean;
  sus4: boolean;
}

export class Chord {
  private readonly SCALE: string[];
  private readonly CHROMATIC: string[];
  private readonly CHORDNUM: number;
  private readonly MODS: ChordModifications;
  private notes: string[] = [];
  private rootIndex: number = -999;
  private isFlat = false;
  private isSharp = false;
  private seventh = false;

  constructor(chordNumber: number, localScale: string[], localChrom: string[], Mods: ChordModifications) {
    this.SCALE = localScale;
    this.CHROMATIC = localChrom;
    this.CHORDNUM = chordNumber - 1; //because TypeScript starts indices at 0, but there is no 
                                     //"0" chord in a chord progression using Roman numerals. 
    this.MODS = Mods;
    for (let i = 0; i < 12; i++) {
      if (this.SCALE[this.CHORDNUM] == this.CHROMATIC[i]) { 
        this.rootIndex = i;
        if (this.isFlat) {
          this.rootIndex = (this.rootIndex - 1) % this.CHROMATIC.length;
          if (this.rootIndex == -1) {
            this.rootIndex = 11;
          }
        }
        else if (this.isSharp) {
          this.rootIndex = (this.rootIndex + 1) % this.CHROMATIC.length;
        }
        break;
      }
    }

    this.notes.push(this.CHROMATIC[this.rootIndex]);
  }

  public getMinorSecond(): void {
    const minorSecond = (this.rootIndex + 1) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorSecond]);
  }

  public getMajorSecond(): void {
    const majorSecond = (this.rootIndex + 2) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorSecond]);
  }

  public getMinorThird(): void {
    const minorThird = (this.rootIndex + 3) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorThird]);
  }

  public getMajorThird(): void {
    const majorThird = (this.rootIndex + 4) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorThird]);
  }

  public getPerfectFourth(): void {
    const perfectFourth = (this.rootIndex + 5) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[perfectFourth]);
  }

  public getFlatFifth(): void {
    const flatFifth = (this.rootIndex + 6) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[flatFifth]);
  }

  public getPerfectFifth(): void {
    const perfectFifth = (this.rootIndex + 7) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[perfectFifth]);
  }

  public getMinorSixth(): void {
    const minorSixth = (this.rootIndex + 8) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorSixth]);
  }

  public getMajorSixth(): void {
    const majorSixth = (this.rootIndex + 9) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorSixth]);
  }

  public getMinorSeventh(): void {
    const minorSeventh = (this.rootIndex + 10) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorSeventh]);
  }

  public getMajorSeventh(): void {
    const majorSeventh = (this.rootIndex + 11) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorSeventh]);
  }

  public getOctave(): void {
    const octave = (this.rootIndex + 12) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[octave]);
  }

  public getMinorNinth(): void {
    const minorNinth = (this.rootIndex + 13) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorNinth]);
  }

  public getMajorNinth(): void {
    const majorNinth = (this.rootIndex + 14) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorNinth]);
  }

  public getEleventh(): void {
    const eleventh = (this.rootIndex + 17) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[eleventh]);
  }

  public getMinorThirteenth(): void {
    const minorThirteenth = (this.rootIndex + 20) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorThirteenth]);
  }

  public getMajorThirteenth(): void {
    const majorThirteenth = (this.rootIndex + 21) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorThirteenth]);
  }

  public getThird(): void {
    const third = (this.CHORDNUM + 2) % this.SCALE.length;
    this.notes.push(this.SCALE[third]);
  }

  public getFifth(): void {
    const fifth = (this.CHORDNUM + 4) % this.SCALE.length;
    this.notes.push(this.SCALE[fifth]);
  }

  public buildChord(): void {
    if (!this.MODS.sus2 && !this.MODS.sus4) {
      this.getThird();
    } else if (this.MODS.sus2) {
      this.getMajorSecond();
    } else if (this.MODS.sus4) {
      this.getPerfectFourth();
    }
    this.getFifth();
    if (this.seventh) {
      const sev = (this.CHORDNUM + 6) % this.SCALE.length;
      this.notes.push(this.SCALE[sev]);
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