"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UberChordAPI_data = void 0;
var UberChordAPI_data = /** @class */ (function () {
    function UberChordAPI_data(param) {
        this.CHORD_DATA = param.map(function (item) { return ({
            STRINGS: item.strings,
            FINGERING: item.fingering,
            CHORD_NAME: item.chordName,
            ENHARMONIC_CHORD_NAME: item.enharmonicChordName,
            VOICING_ID: item.voicingID,
            TONES: item.tones
        }); });
    }
    UberChordAPI_data.prototype.getStringsAsArray = function () {
        if (this.CHORD_DATA.length > 0) { //Ensure CHORD_DATA is not empty in case there is an issue with the API call
            var str = this.CHORD_DATA[0].STRINGS;
            return str.split(" ");
        }
        return [""];
    };
    UberChordAPI_data.prototype.getStringsAsString = function () {
        if (this.CHORD_DATA.length > 0) {
            return this.CHORD_DATA[0].STRINGS;
        }
        return "";
    };
    UberChordAPI_data.prototype.getChordNameAsArray = function () {
        if (this.CHORD_DATA.length > 0) { //Ensure CHORD_DATA is not empty in case there is an issue with the API call
            var str = this.CHORD_DATA[0].CHORD_NAME;
            return str.split(",");
        }
        return [""];
    };
    UberChordAPI_data.prototype.getEnharmonicNameAsArray = function () {
        if (this.CHORD_DATA.length > 0) { //Ensure CHORD_DATA is not empty in case there is an issue with the API call
            var str = this.CHORD_DATA[0].ENHARMONIC_CHORD_NAME;
            return str.split(",");
        }
        return [""];
    };
    UberChordAPI_data.prototype.getChordNameAsString = function () {
        if (this.CHORD_DATA.length > 0) {
            return this.CHORD_DATA[0].CHORD_NAME;
        }
        return "";
    };
    UberChordAPI_data.prototype.getEnharmonicNameAsString = function () {
        if (this.CHORD_DATA.length > 0) {
            return this.CHORD_DATA[0].ENHARMONIC_CHORD_NAME;
        }
        return "";
    };
    UberChordAPI_data.prototype.getTones = function () {
        if (this.CHORD_DATA.length > 0) {
            var str = this.CHORD_DATA[0].TONES;
            return str.split(",");
        }
        return [""];
    };
    UberChordAPI_data.prototype.getDATA = function () {
        return this.CHORD_DATA;
    };
    return UberChordAPI_data;
}());
exports.UberChordAPI_data = UberChordAPI_data;
