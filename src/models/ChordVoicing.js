"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChordVoicing = void 0;
var UberChordAPI_data_1 = require("./UberChordAPI_data");
var ChordVoicing = /** @class */ (function () {
    function ChordVoicing(param_notes, param_compensate, param_tuning) {
        this.tuning = ["E", "A", "D", "G", "B", "E"]; //standard tuning as default. Only change if _compensateTuning is true
        //starts with string6, string5, ... , string1
        this.stringNotes = [
            ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"], //string6
            ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], //string5
            ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"], //string4
            ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"], //string3
            ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"], //string2
            ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"] //string1
        ];
        this.STANDARD = [
            ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"], //string6
            ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], //string5
            ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"], //string4
            ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"], //string3
            ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"], //string2
            ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"] //string1
        ];
        this.notes = param_notes;
        this.COMPENSATE_TUNING = param_compensate;
        if (param_compensate && !param_tuning) { //should be an error because the selected tuning needs to be specified to know how to handle compensation
            throw new Error("The selected tuning needs to be specified to handle compensation");
        }
        else if (param_compensate && param_tuning) {
            this.tuning = param_tuning;
        }
    }
    ChordVoicing.prototype.tuneEachString = function () {
        var _loop_1 = function (nthString) {
            var displacement = 0;
            while ((this_1.tuning[nthString] != this_1.stringNotes[nthString][displacement]) && (displacement < 12)) {
                displacement++; //displacement will tell us how much we need to shift/offset the array, so that this.stringNotes[nthString][0] will be equal to that string's tuning
            }
            var currentString = this_1.stringNotes[nthString];
            var size = currentString.length;
            displacement = size - displacement;
            displacement = displacement % size;
            var reverse = function (start, end) {
                var _a;
                while (start < end) {
                    _a = [currentString[end], currentString[start]], currentString[start] = _a[0], currentString[end] = _a[1];
                    start++;
                    end--;
                }
            };
            reverse(0, size - 1);
            reverse(0, displacement - 1);
            reverse(displacement, size - 1);
        };
        var this_1 = this;
        for (var nthString = 0; nthString < this.tuning.length; nthString++) {
            _loop_1(nthString);
        }
    };
    ChordVoicing.prototype.convertNotesToVoicing = function () {
        var numOfNotesInChord = this.notes.length;
        var tabsFrets = ["X", "X", "X", "X", "X", "X"];
        for (var nthString = 0; nthString < numOfNotesInChord; nthString++) {
            var currentString = this.stringNotes[nthString];
            var size = currentString.length;
            var fret = 0;
            while (currentString[fret] != this.notes[nthString] && fret < currentString.length) {
                fret++;
            }
            tabsFrets[nthString] = fret.toString();
        }
        var voicing = "";
        for (var i = 0; i < 6; i++) {
            if (i < 5) {
                voicing = voicing + tabsFrets[i] + "-";
            }
            else {
                voicing = voicing + tabsFrets[i];
            }
        }
        return voicing;
    };
    ChordVoicing.prototype.convertNotesToVoicingArray = function (param) {
        var tabsFrets = ["X", "X", "X", "X", "X", "X"];
        for (var nthString = 0; nthString < tabsFrets.length; nthString++) {
            var currentString = this.stringNotes[nthString];
            var fret = 0;
            while (param[nthString] != currentString[fret] && fret < currentString.length) {
                fret++;
            }
            tabsFrets[nthString] = fret.toString();
        }
        return tabsFrets;
    };
    ChordVoicing.prototype.convertNotesToVoicingStandard = function () {
        var numOfNotesInChord = this.notes.length;
        var tabsFrets = ["X", "X", "X", "X", "X", "X"];
        for (var nthString = 0; nthString < numOfNotesInChord; nthString++) {
            var currentString = this.STANDARD[nthString];
            var fret = 0;
            while (currentString[fret] != this.notes[nthString] && fret < currentString.length) {
                fret++;
            }
            tabsFrets[nthString] = fret.toString();
        }
        var voicing = "";
        for (var i = 0; i < 6; i++) {
            if (i < 5) {
                voicing = voicing + tabsFrets[i] + "-";
            }
            else {
                voicing = voicing + tabsFrets[i];
            }
        }
        return voicing;
    };
    ChordVoicing.prototype.convertVoicingToNotesArray = function (param) {
        var fretTabsStr = param.split(" ");
        var notesArr = [];
        var fretNumber = 0;
        for (var i = 0; i < fretTabsStr.length; i++) {
            var tunedStringNotes = this.stringNotes[i]; //Check each string, from lowest to highest, for the notes at each fret number in fretTabsStr
            if (fretTabsStr[i] != "X") {
                fretNumber = parseInt(fretTabsStr[i]);
                notesArr.push(tunedStringNotes[fretNumber]);
            }
            else {
                notesArr.push("X");
            }
        }
        return notesArr;
    };
    ChordVoicing.prototype.checkForNotesToRemove = function (param1, tonesParam) {
        var correctTones = tonesParam.split(","); //these are the tones to keep, all other tones should be removed from param1
        var tonesToCheck = param1;
        for (var i = 0; i < correctTones.length; i++) { //for consistency in how notes are written, convert all flats to their sharp equivalent. Ex: Eb -> D#
            switch (correctTones[i]) {
                case "Db":
                    correctTones[i] = "C#";
                    break;
                case "Eb":
                    correctTones[i] = "D#";
                    break;
                case "Gb":
                    correctTones[i] = "F#";
                    break;
                case "Ab":
                    correctTones[i] = "G#";
                    break;
                case "Bb":
                    correctTones[i] = "A#";
                    break;
                default:
                    break;
            }
        }
        var indicesNeedReplacing = Array(tonesToCheck.length).fill(false);
        for (var i = 0; i < tonesToCheck.length; i++) {
            if (tonesToCheck[i] == "X") { //Nothing to replace
                //continue;
            }
            else {
                var replaceFlag = true;
                for (var j = 0; j < correctTones.length; j++) { //check the entire correctNotes array to see if tonesToCheck[i] belongs
                    if (tonesToCheck[i] === correctTones[j]) {
                        replaceFlag = false;
                    }
                }
                if (replaceFlag) { //Need to replace these notes either with the nearest available note, within 2 frets below or 3 frets above, or an "X" if no such note is available.
                    indicesNeedReplacing[i] = true; //Mark index for needing replacement
                }
            }
        }
        var voice = this.convertNotesToVoicingArray(tonesToCheck);
        return this.replaceNotes(tonesToCheck, correctTones, indicesNeedReplacing, voice);
    };
    ChordVoicing.prototype.replaceNotes = function (param, correctNotesParam, indices, voice_arr) {
        var notes = param;
        var voicingArray = voice_arr;
        var correctNotes = correctNotesParam;
        for (var i = 0; i < indices.length; i++) {
            var currentNote = notes[i];
            var currentFret = void 0;
            var noteFixed = false;
            if (indices[i]) { //if the index is marked true for replacement, then notes[i] needs to be replaced. i is also the nthString to check (Ex: if i = 0, check the lowest string/6th string)
                for (var j = 0; (j < this.stringNotes[i].length) && !noteFixed; j++) { //first check the string to find any of the notes in correctNotesParam. 
                    if (currentNote == this.stringNotes[i][j]) {
                        currentFret = j; //marking the fret number of the incorrect note, so the distance to the nearest correct note can be calculated;
                        var offsets = [1, -1, 2, -2, 3]; // the order of frets to check, ie 1 fret above, then 1 below, then 2 above...etc
                        for (var _i = 0, offsets_1 = offsets; _i < offsets_1.length; _i++) {
                            var offset = offsets_1[_i];
                            var above12thFret = false;
                            var k = (j + offset) % this.stringNotes[i].length; //check one fret above. The % this.stringNotes[i].length is in case j is at the 11th fret, it will check the 12th fret and above, as the 12th fret note will be the same as the 0 index note.
                            if (k >= 0) { //Cannot have a negative fret
                                if (j + offset >= this.stringNotes[i].length) {
                                    above12thFret = true;
                                }
                                for (var element = 0; element < correctNotes.length; element++) { //check each element in correctNotes to see if this.stringNotes[i][k] is a correct note
                                    if (this.stringNotes[i][k] === correctNotes[element]) {
                                        notes[i] = "(" + correctNotes[element] + ")";
                                        if (above12thFret) {
                                            currentFret = 12 + k;
                                            voicingArray[i] = "(" + currentFret.toString() + ")";
                                            noteFixed = true;
                                            break;
                                        }
                                        else {
                                            currentFret = k;
                                            voicingArray[i] = "(" + currentFret.toString() + ")";
                                            noteFixed = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (noteFixed) {
                                break;
                            }
                        }
                        if (!noteFixed) {
                            notes[i] = "(X)";
                            voicingArray[i] = "(X)";
                            noteFixed = true;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < notes.length; i++) {
            if (notes[i] === "X") {
                voicingArray[i] = "X";
            }
            else if (notes[i] === "(X)") {
                voicingArray[i] = "(X)";
            }
        }
        return [notes, voicingArray];
    };
    ChordVoicing.prototype.mergeChordData = function (param1, param2) {
        // param1 should be the object created with the normal voicing function
        // param2 should be the object created with the standard tuning voicing function
        var strings = param1.getDATA()[0].STRINGS;
        var fingering = param1.getDATA()[0].FINGERING;
        var chordName = param2.getDATA()[0].CHORD_NAME;
        var enharmonicChordName = param2.getDATA()[0].ENHARMONIC_CHORD_NAME;
        var voicing_ID = param1.getDATA()[0].VOICING_ID;
        var tones = param2.getDATA()[0].TONES;
        // convert stings to an array of notes based upon the selected-tuning array (not the constant standard tuning array), and then check to see if any of these notes are not present in tones.
        var strArr = this.convertVoicingToNotesArray(strings);
        var correctedVoicingTab = this.checkForNotesToRemove(strArr, tones)[1];
        strings = "";
        for (var i = 0; i < correctedVoicingTab.length; i++) {
            if (i < correctedVoicingTab.length - 1) {
                strings = strings + correctedVoicingTab[i] + " ";
            }
            else {
                strings = strings + correctedVoicingTab[i];
            }
        }
        var mergedData = new UberChordAPI_data_1.UberChordAPI_data([{ strings: strings, fingering: fingering, chordName: chordName, enharmonicChordName: enharmonicChordName, voicing_ID: voicing_ID, tones: tones }]);
        return mergedData;
    };
    ChordVoicing.prototype.fetchChordDataByVoicing = function (voice_param) {
        return __awaiter(this, void 0, void 0, function () {
            var voicing, url, response, data, call, chordName, enharmonicData, standardVoicing, data2, call2, mergedData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        voicing = voice_param;
                        url = "https://api.uberchord.com/v1/chords?voicing=".concat(voicing);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, fetch(url)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        call = new UberChordAPI_data_1.UberChordAPI_data(data);
                        chordName = call.getEnharmonicNameAsArray();
                        return [4 /*yield*/, this.fetchChordDataByEnharmonicName(chordName)];
                    case 4:
                        enharmonicData = _a.sent();
                        call = new UberChordAPI_data_1.UberChordAPI_data(enharmonicData); //Normal data
                        if (!this.COMPENSATE_TUNING) return [3 /*break*/, 6];
                        standardVoicing = this.convertNotesToVoicingStandard();
                        return [4 /*yield*/, this.fetchChordDataByStandardVoicing(standardVoicing)];
                    case 5:
                        data2 = _a.sent();
                        call2 = new UberChordAPI_data_1.UberChordAPI_data(data2);
                        mergedData = this.mergeChordData(call, call2);
                        return [2 /*return*/, mergedData];
                    case 6: return [2 /*return*/, call];
                    case 7:
                        error_1 = _a.sent();
                        console.error('Error fetching data:', error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, null];
                }
            });
        });
    };
    ChordVoicing.prototype.fetchChordDataByStandardVoicing = function (voice_param) {
        return __awaiter(this, void 0, void 0, function () {
            var voicing, url, response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        voicing = voice_param;
                        url = "https://api.uberchord.com/v1/chords?voicing=".concat(voicing);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error fetching data:', error_2);
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChordVoicing.prototype.fetchChordDataByEnharmonicName = function (name_param) {
        return __awaiter(this, void 0, void 0, function () {
            var chordName, url, response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            chordName = name_param[0] + "_" + name_param[1] + name_param[2] + "_" + name_param[3];
                        }
                        catch (error) {
                            console.error('Error with the enharmonic chord name', error);
                            return [2 /*return*/, []];
                        }
                        url = "https://api.uberchord.com/v1/chords/".concat(chordName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 4:
                        error_3 = _a.sent();
                        console.error('Error fetching data:', error_3);
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ChordVoicing;
}());
exports.ChordVoicing = ChordVoicing;
