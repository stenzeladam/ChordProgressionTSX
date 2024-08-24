interface ChordModifications {
  sus2: boolean;
  sus4: boolean;
  major: boolean;
  minor: boolean;
  FifthChord: boolean;
  SixthChord: boolean;
  dom7: boolean;
  maj7: boolean;
  min7: boolean;
  min_Maj7: boolean;
  add7: boolean;
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

  private getMinorSecond(): void {
    const minorSecond = (this.rootIndex + 1) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorSecond]);
  }

  private getMajorSecond(): void {
    const majorSecond = (this.rootIndex + 2) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorSecond]);
  }

  private getMinorThird(): void {
    const minorThird = (this.rootIndex + 3) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorThird]);
  }

  private getMajorThird(): void {
    const majorThird = (this.rootIndex + 4) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorThird]);
  }

  private getPerfectFourth(): void {
    const perfectFourth = (this.rootIndex + 5) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[perfectFourth]);
  }

  private getFlatFifth(): void {
    const flatFifth = (this.rootIndex + 6) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[flatFifth]);
  }

  private getPerfectFifth(): void {
    const perfectFifth = (this.rootIndex + 7) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[perfectFifth]);
  }

  private getMinorSixth(): void {
    const minorSixth = (this.rootIndex + 8) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorSixth]);
  }

  private getMajorSixth(): void {
    const majorSixth = (this.rootIndex + 9) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorSixth]);
  }

  private getMinorSeventh(): void {
    const minorSeventh = (this.rootIndex + 10) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorSeventh]);
  }

  private getMajorSeventh(): void {
    const majorSeventh = (this.rootIndex + 11) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorSeventh]);
  }

  private getOctave(): void {
    const octave = (this.rootIndex + 12) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[octave]);
  }

  private getMinorNinth(): void {
    const minorNinth = (this.rootIndex + 13) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorNinth]);
  }

  private getMajorNinth(): void {
    const majorNinth = (this.rootIndex + 14) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorNinth]);
  }

  private getEleventh(): void {
    const eleventh = (this.rootIndex + 17) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[eleventh]);
  }

  private getMinorThirteenth(): void {
    const minorThirteenth = (this.rootIndex + 20) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[minorThirteenth]);
  }

  private getMajorThirteenth(): void {
    const majorThirteenth = (this.rootIndex + 21) % this.CHROMATIC.length;
    this.notes.push(this.CHROMATIC[majorThirteenth]);
  }

  private getThird(): void {
    const third = (this.CHORDNUM + 2) % this.SCALE.length;
    this.notes.push(this.SCALE[third]);
  }

  private getFifth(): void {
    const fifth = (this.CHORDNUM + 4) % this.SCALE.length;
    this.notes.push(this.SCALE[fifth]);
  }

  public buildChord(): void {
    if (!(this.MODS.sus2 || this.MODS.sus4 || this.MODS.major || this.MODS.minor || this.MODS.FifthChord || this.MODS.dom7 || this.MODS.maj7 || this.MODS.min7 || this.MODS.min_Maj7)) {
      this.getThird();
    } 
    else if (this.MODS.sus2) {
      this.getMajorSecond();
    } 
    else if (this.MODS.sus4) {
      this.getPerfectFourth();
    }
    else if (this.MODS.major) {
      this.getMajorThird();
    }
    else if (this.MODS.minor) {
      this.getMinorThird();
    }
    else if (this.MODS.FifthChord) {
      // Don't add a third
    }
    else if (this.MODS.dom7 || this.MODS.maj7) {
      this.getMajorThird();
    }
    else if (this.MODS.min7 || this.MODS.min_Maj7) {
      this.getMinorThird();
    }
    
    this.getFifth(); // add the fifth
    
    if (this.MODS.SixthChord) {
      this.getMajorSixth();
    }
    
    if (this.MODS.add7) {
      const seventh = (this.CHORDNUM + 6) % this.SCALE.length;
      this.notes.push(this.SCALE[seventh]);
    }
    else if (this.MODS.dom7 || this.MODS.min7) {
      this.getMinorSeventh();
    }
    else if (this.MODS.dom7 || this.MODS.min7) {
      this.getMinorSeventh();
    }
    else if (this.MODS.maj7 || this.MODS.min_Maj7) {
      this.getMajorSeventh();
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