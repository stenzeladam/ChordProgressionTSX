"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chord = void 0;
var Chord = /** @class */ (function () {
    function Chord(chordNumber, localScale, localChrom, Mods) {
        this.notes = [];
        this.rootIndex = -999;
        this.isFlat = false;
        this.isSharp = false;
        this.sus2 = false;
        this.sus4 = false;
        this.seventh = false;
        this._scale = localScale;
        this._chromatic = localChrom;
        this._chordNum = chordNumber - 1; //because TypeScript starts indices at 0, but there is no 
        //"0" chord in a chord progression using Roman numerals. 
        if (Mods) {
            this.isFlat = Mods[0];
            this.isSharp = Mods[1];
            this.sus2 = Mods[2];
            this.sus4 = Mods[3];
            this.seventh = Mods[4];
        }
        for (var i = 0; i < 12; i++) {
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
    Chord.prototype.getMinorSecond = function () {
        var minorSecond = (this.rootIndex + 1) % this._chromatic.length;
        this.notes.push(this._chromatic[minorSecond]);
    };
    Chord.prototype.getMajorSecond = function () {
        var majorSecond = (this.rootIndex + 2) % this._chromatic.length;
        this.notes.push(this._chromatic[majorSecond]);
    };
    Chord.prototype.getMinorThird = function () {
        var minorThird = (this.rootIndex + 3) % this._chromatic.length;
        this.notes.push(this._chromatic[minorThird]);
    };
    Chord.prototype.getMajorThird = function () {
        var majorThird = (this.rootIndex + 4) % this._chromatic.length;
        this.notes.push(this._chromatic[majorThird]);
    };
    Chord.prototype.getPerfectFourth = function () {
        var perfectFourth = (this.rootIndex + 5) % this._chromatic.length;
        this.notes.push(this._chromatic[perfectFourth]);
    };
    Chord.prototype.getFlatFifth = function () {
        var flatFifth = (this.rootIndex + 6) % this._chromatic.length;
        this.notes.push(this._chromatic[flatFifth]);
    };
    Chord.prototype.getPerfectFifth = function () {
        var perfectFifth = (this.rootIndex + 7) % this._chromatic.length;
        this.notes.push(this._chromatic[perfectFifth]);
    };
    Chord.prototype.getMinorSixth = function () {
        var minorSixth = (this.rootIndex + 8) % this._chromatic.length;
        this.notes.push(this._chromatic[minorSixth]);
    };
    Chord.prototype.getMajorSixth = function () {
        var majorSixth = (this.rootIndex + 9) % this._chromatic.length;
        this.notes.push(this._chromatic[majorSixth]);
    };
    Chord.prototype.getMinorSeventh = function () {
        var minorSeventh = (this.rootIndex + 10) % this._chromatic.length;
        this.notes.push(this._chromatic[minorSeventh]);
    };
    Chord.prototype.getMajorSeventh = function () {
        var majorSeventh = (this.rootIndex + 11) % this._chromatic.length;
        this.notes.push(this._chromatic[majorSeventh]);
    };
    Chord.prototype.getOctave = function () {
        var octave = (this.rootIndex + 12) % this._chromatic.length;
        this.notes.push(this._chromatic[octave]);
    };
    Chord.prototype.getMinorNinth = function () {
        var minorNinth = (this.rootIndex + 13) % this._chromatic.length;
        this.notes.push(this._chromatic[minorNinth]);
    };
    Chord.prototype.getMajorNinth = function () {
        var majorNinth = (this.rootIndex + 14) % this._chromatic.length;
        this.notes.push(this._chromatic[majorNinth]);
    };
    Chord.prototype.getEleventh = function () {
        var eleventh = (this.rootIndex + 17) % this._chromatic.length;
        this.notes.push(this._chromatic[eleventh]);
    };
    Chord.prototype.getMinorThirteenth = function () {
        var minorThirteenth = (this.rootIndex + 20) % this._chromatic.length;
        this.notes.push(this._chromatic[minorThirteenth]);
    };
    Chord.prototype.getMajorThirteenth = function () {
        var majorThirteenth = (this.rootIndex + 21) % this._chromatic.length;
        this.notes.push(this._chromatic[majorThirteenth]);
    };
    Chord.prototype.getThird = function () {
        var third = (this._chordNum + 2) % this._scale.length;
        this.notes.push(this._scale[third]);
    };
    Chord.prototype.getFifth = function () {
        var fifth = (this._chordNum + 4) % this._scale.length;
        this.notes.push(this._scale[fifth]);
    };
    Chord.prototype.buildChord = function () {
        if (!this.sus2 && !this.sus4) {
            this.getThird();
        }
        else if (this.sus2) {
            this.getMajorSecond();
        }
        else if (this.sus4) {
            this.getPerfectFourth();
        }
        this.getFifth();
        if (this.seventh) {
            var sev = (this._chordNum + 6) % this._scale.length;
            this.notes.push(this._scale[sev]);
        }
    };
    Chord.prototype.getNotes = function () {
        return this.notes;
    };
    Chord.prototype.getNotes_String = function () {
        var str = "[ ";
        for (var i = 0; i < this.notes.length; i++) {
            if ((i < this.notes.length - 1) && this.notes[i]) {
                str = str + this.notes[i] + ", ";
            }
            else if (this.notes[i]) {
                str = str + this.notes[i] + " ]";
            }
        }
        return str;
    };
    return Chord;
}());
exports.Chord = Chord;
