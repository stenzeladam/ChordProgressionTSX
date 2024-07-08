"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modes = void 0;
var Modes = /** @class */ (function () {
    function Modes(root_param) {
        this.scale = [];
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
    Modes.prototype.applyMode = function (mode) {
        switch (mode) {
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
    };
    Modes.prototype.ionian = function () {
        this.scale = ["", "", "", "", "", "", ""];
        var j = 0;
        for (var i = 0; i < this.scale.length; i++) {
            if (i != 2) { // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else { // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    };
    Modes.prototype.dorian = function () {
        this.scale = ["", "", "", "", "", "", ""];
        var j = 0;
        for (var i = 0; i < this.scale.length; i++) {
            if (i != 1 && i != 5) { // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else { // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    };
    Modes.prototype.phrygian = function () {
        this.scale = ["", "", "", "", "", "", ""];
        var j = 0;
        for (var i = 0; i < this.scale.length; i++) {
            if (i != 0 && i != 4) { // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else { // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    };
    Modes.prototype.lydian = function () {
        this.scale = ["", "", "", "", "", "", ""];
        var j = 0;
        for (var i = 0; i < this.scale.length; i++) {
            if (i != 3) { // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else { // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    };
    Modes.prototype.mixolydian = function () {
        this.scale = ["", "", "", "", "", "", ""];
        var j = 0;
        for (var i = 0; i < this.scale.length; i++) {
            if (i != 2 && i != 5) { // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else { // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    };
    Modes.prototype.aeolian = function () {
        this.scale = ["", "", "", "", "", "", ""];
        var j = 0;
        for (var i = 0; i < this.scale.length; i++) {
            if (i != 1 && i != 4) { // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else { // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    };
    Modes.prototype.locrian = function () {
        this.scale = ["", "", "", "", "", "", ""];
        var j = 0;
        for (var i = 0; i < this.scale.length; i++) {
            if (i != 0 && i != 3) { // whole step
                this.scale[i] = this._chromatic[j];
                j++;
                j++;
            }
            else { // half step
                this.scale[i] = this._chromatic[j];
                j++;
            }
        }
    };
    Modes.prototype.getScale = function () {
        return this.scale;
    };
    Modes.prototype.getChromatic = function () {
        return this._chromatic;
    };
    Modes.prototype.getRoot = function () {
        return this._root;
    };
    return Modes;
}());
exports.Modes = Modes;
