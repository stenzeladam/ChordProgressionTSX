import { CustomChordData } from "./CustomChordData";
import { ChordVoicing } from "./ChordVoicing";
import { Chord } from "./Chord";
import { ChordInterface } from './ChordProgressionAPI';

export async function createVoicingsAndData(param: ChordVoicing) {
    try {
        const voicingsAndData = await param.determineVoicingsAndData(param.convertNotesToBasicVoicing())
        return voicingsAndData;

    } catch (error) {
      let junkData = new CustomChordData(
          [['X-X-X-X-X-X']], // TABS: 2D array of random strings
          ["Undefined"],                     // NAMES: random string
          ['X', 'X']          // TONES: array of random musical notes
        );
        console.error('Error fetching or creating instance:', error);
        return junkData;
    }
}

export function convertToRoman(num: number): string {
  const romanNumeralMap: { value: number; numeral: string }[] = [
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
  ];

  let result = '';

  for (const { value, numeral } of romanNumeralMap) {
      while (num >= value) {
          result += numeral;
          num -= value;
      }
  }

  return result;
}

export async function addChord(data: any) {
    let tempChord = new Chord(data.numeral, data.mode.scale, data.mode.chromatic, data.ChordMods);
    tempChord.buildChord();
    let tempVoicing = new ChordVoicing(tempChord.getNotes(), data.compensate, data.tuning);
    tempVoicing.tuneEachString();
    let chordData: CustomChordData = await createVoicingsAndData(tempVoicing);
    let newChordDataInterface = chordData?.getData();
    let chordsArr = data.chordsArray;
    let uniqueID;
    if (chordsArr.length === 0) {
        uniqueID = 0;
    }
    else {
        let last = chordsArr.length - 1;
        uniqueID = chordsArr[last].rowID + 1;
    }
    let chordNumeral: string = convertToRoman(data.numeral);
    if (newChordDataInterface) {
        chordsArr = [
            ...chordsArr,
            {
                rowID: uniqueID,
                numeral: chordNumeral,
                chord_name: newChordDataInterface.NAMES,
                chord_tabs: newChordDataInterface.TABS,
                chord_notes: newChordDataInterface.TONES
            }
        ]
    }
    uniqueID++;
    return chordsArr;
}

export function deleteChord(chordsArray: string, rowID: string): ChordInterface[] | { error: string } {
    if (!chordsArray || typeof rowID !== 'string') {
      return { error: 'Invalid request parameters' };
    }
  
    try {
      const parsedChordsArray = JSON.parse(chordsArray) as ChordInterface[];
      const idToDelete = parseInt(rowID, 10);
  
      if (isNaN(idToDelete)) {
        return { error: 'Invalid rowID' };
      }
  
      // Filter out the chord with the specified rowID
      const newChordsArray = parsedChordsArray.filter((chord) => chord.rowID !== idToDelete);
      return newChordsArray;
    } catch (error) {
      console.error('Error parsing chords array:', error);
      return { error: 'Internal server error' };
    }
  }