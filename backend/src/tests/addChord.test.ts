import { addChord } from '../helpers';  // Adjust the path if necessary

describe('addChord', () => {
  it('should add Cm chord in C standard tuning (compensated) in C Aeolian', async () => {
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

    // Verify the result via the chord_notes
    expect(result).toEqual([
      {
        rowID: 0,
        numeral: expect.stringMatching(/^[Ii]$/),  // Match either 'I' or 'i'
        chord_name: expect.any(Array),
        chord_tabs: expect.arrayContaining(["0-2-2-0-0-0"]),
        chord_notes: "C, D#, G",  // a string of chord notes
      },
    ]);
  });
});

describe('addChord', () => {
  it('should add C5 power chord in C standard tuning (compensated) in C Aeolian', async () => {
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
        FifthChord: true,
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

    // Verify the result via the chord_notes
    expect(result).toEqual([
      {
        rowID: 0,
        numeral: expect.stringMatching(/^[Ii]$/),  // Match either 'I' or 'i'
        chord_name: ["C5"],
        chord_tabs: expect.arrayContaining([
          "0-2-X-X-X-X",
          "X-7-9-X-X-X",
          "X-X-2-4-X-X"
      ]),
        chord_notes: "C, G",  // a string of chord notes
      },
    ]);
  });
});

describe('addChord', () => {
  it('should add Cm chord in C standard tuning (not compensated) in C Aeolian', async () => {
    // Setup sample input data
    const inputData = {
      numeral: 1,
      mode: {
        root: 'C',
        chromatic: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        scale: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
      },
      compensate: false,
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

    // Verify the result via the chord_notes
    expect(result).toEqual([
      {
        rowID: 0,
        numeral: expect.stringMatching(/^[Ii]$/),  // Match either 'I' or 'i'
        chord_name: expect.any(Array),
        chord_tabs: expect.arrayContaining(["8-10-10-8-8-8"]), // not compensated
        chord_notes: "C, D#, G",  // a string of chord notes
      },
    ]);
  });
});

describe('addChord', () => {
  it('should add Ddim chord in C Standard (compensated) tuning in C Aeolian', async () => {
    // Setup sample input data
    const inputData = {
      numeral: 2,
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
        numeral: expect.stringMatching(/^[Ii][Ii]$/),  // Example: Match either 'II' or 'ii'
        chord_name: expect.arrayContaining(['Ddim']),  // Expect 'Ddim' in the chord name array
        chord_tabs: expect.any(Array),  // Example expectation: an array of chord tabs
        chord_notes: 'D, F, G#',  // Expect this exact chord notes string
      },
    ]);
  });
});

describe('addChord', () => {
  it('should add the VII chord to an array of chords I-VI in C Aeolian in C Standard (compensated) tuning', async () => {
    const inputData = {
      numeral: 7,
      mode: {
        root: 'C',
        chromatic: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        scale: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
      },
      compensate: true,
      tuning: ['C', 'F', 'A#', 'D#', 'G', 'C'],
      chordsArray: [
        {
          rowID: 0,
          numeral: 'I',
          chord_name: ['Cm'],
          chord_tabs: ['0-2-2-0-0-0', 'X-7-9-9-8-7', 'X-X-2-4-5-3'],
          chord_notes: 'C, D#, G',
        },
        {
          rowID: 1,
          numeral: 'II',
          chord_name: ['Ddim', 'D°'],
          chord_tabs: ['2-3-4-2-X-2', 'X-9-10-11-10-X', 'X-X-4-5-7-5'],
          chord_notes: 'D, F, G#',
        },
        {
          rowID: 2,
          numeral: 'III',
          chord_name: ['D#', 'Gm#5/D#'],
          chord_tabs: ['3-2-0-0-3-3', 'X-10-12-12-12-10', 'X-X-5-7-8-7'],
          chord_notes: 'D#, G, A#',
        },
        {
          rowID: 3,
          numeral: 'IV',
          chord_name: ['Fm'],
          chord_tabs: ['5-7-7-5-5-5', 'X-0-2-2-1-0', 'X-X-7-9-10-8'],
          chord_notes: 'F, G#, C',
        },
        {
          rowID: 4,
          numeral: 'V',
          chord_name: ['Gm'],
          chord_tabs: ['7-9-9-7-7-7', 'X-2-4-4-3-2', 'X-X-9-11-12-10'],
          chord_notes: 'G, A#, D',
        },
        {
          rowID: 5,
          numeral: 'VI',
          chord_name: ['G#', 'Cm#5/G#'],
          chord_tabs: ['8-10-10-9-8-8', 'X-3-2-0-1-3', 'X-X-10-12-13-12'],
          chord_notes: 'G#, C, D#',
        },
      ],
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
        numeral: expect.stringMatching(/^[Ii]$/),  // Match either 'I' or 'i'
        chord_name: expect.arrayContaining(['Cm']),
        chord_tabs: expect.arrayContaining(["0-2-2-0-0-0"]),
        chord_notes: 'C, D#, G',
      },
      {
        rowID: 1,
        numeral: expect.stringMatching(/^[Ii][Ii]$/),  // Example: Match either 'II' or 'ii'
        chord_name: expect.arrayContaining(['Ddim']),
        chord_tabs: expect.arrayContaining(["X-9-10-11-10-X"]),
        chord_notes: 'D, F, G#',
      },
      {
        rowID: 2,
        numeral: "III",
        chord_name: expect.arrayContaining(['D#']),
        chord_tabs: expect.arrayContaining(['3-2-0-0-3-3']),
        chord_notes: 'D#, G, A#',
      },
      {
        rowID: 3,
        numeral: expect.stringMatching(/^[Ii][Vv]$/),  // Example: Match either 'IV' or 'iv'
        chord_name: expect.arrayContaining(['Fm']),
        chord_tabs: expect.arrayContaining(['X-0-2-2-1-0']),
        chord_notes: 'F, G#, C',
      },
      {
        rowID: 4,
        numeral: expect.stringMatching(/^[Vv]$/),  // Match either 'V' or 'v'
        chord_name: expect.arrayContaining(['Gm']),
        chord_tabs: expect.arrayContaining(['7-9-9-7-7-7']),
        chord_notes: 'G, A#, D',
      },
      {
        rowID: 5,
        numeral: 'VI',
        chord_name: expect.arrayContaining(['G#']),
        chord_tabs: expect.arrayContaining(['8-10-10-9-8-8']),
        chord_notes: 'G#, C, D#',
      },
      {
        rowID: 6,
        numeral: 'VII',
        chord_name: expect.arrayContaining(['A#']),
        chord_tabs: expect.arrayContaining(['10-12-12-11-10-10', 'X-X-0-2-3-2']),
        chord_notes: 'A#, D, F',
      },
    ]);
  });
});

