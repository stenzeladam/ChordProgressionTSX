// tests/addChord.test.ts
import { addChord } from '../helpers';  // Adjust the path if necessary
import { Chord } from '../Chord';
import { ChordVoicing } from '../ChordVoicing';
import { CustomChordData } from '../CustomChordData';

describe('addChord', () => {
  it('should add a new chord to the array and return the updated array', async () => {
    // Setup sample input data
    const inputData = {
      numeral: 1,
      mode: {
        root: 'C',
        chromatic: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        scale: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
      },
      compensate: true,
      tuning: ['C', 'F', 'A#', 'D#', 'G', 'C'],
      chordsArray: [],  // Start with an empty chord array
      ChordMods: {
        FifthChord: false,
        sharp: false,
        flat: false,
        sus2: false,
        sus4: false,
        major: false,
        minor: false,
        SixthChord: false,
        dom7: false,
        maj7: false,
        min7: false,
        min_Maj7: false,
        add7: false,
        add9: false,
        slashChord: { isChecked: false, bassNote: '' },
      },
    };

    // Call the function with the input data
    const result = await addChord(inputData);

    // Verify the result
    expect(result).toEqual([
      {
        rowID: 0,
        numeral: 'I',  // Based on the input data
        chord_name: expect.any(Array),  // Example expectation: an array of chord names
        chord_tabs: expect.any(Array),  // Example expectation: an array of chord tabs
        chord_notes: expect.any(String),  // Example expectation: a string of chord notes
      },
    ]);

    // Optionally, if you know the exact expected output, you can do this:
    // expect(result).toEqual([
    //   {
    //     rowID: 0,
    //     numeral: 'I',
    //     chord_name: ['Cm'],  // Example based on your code
    //     chord_tabs: ['0-2-2-0-0-0', 'X-7-9-9-8-7', 'X-X-2-4-5-3'],
    //     chord_notes: 'C, D#, G',
    //   },
    // ]);
  });
});
