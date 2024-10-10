import { CustomChordData } from "./CustomChordData";
import { ChordVoicing } from "./ChordVoicing";
import { Chord } from "./Chord";
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