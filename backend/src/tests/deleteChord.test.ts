import { deleteChord } from '../helpers';  // Adjust the path as needed

describe('deleteChord', () => {
  it('should delete the chord with the specified rowID', () => {
    const chordsArray = JSON.stringify([
      { rowID: 0, numeral: 'I', chord_name: ['Cm'], chord_tabs: ['X-3-5-5-4-3'], chord_notes: 'C, D#, G' },
      { rowID: 1, numeral: 'V', chord_name: ['G'], chord_tabs: ['3-2-0-0-0-3'], chord_notes: 'G, B, D' },
    ]);

    const result = deleteChord(chordsArray, '1');

    expect(result).toEqual([
      { rowID: 0, numeral: 'I', chord_name: ['Cm'], chord_tabs: ['X-3-5-5-4-3'], chord_notes: 'C, D#, G' }
    ]);
  });

  it('should return an error if rowID is invalid', () => {
    const chordsArray = JSON.stringify([
      { rowID: 0, numeral: 'I', chord_name: ['Cm'], chord_tabs: ['X-3-5-5-4-3'], chord_notes: 'C, D#, G' },
    ]);

    const result = deleteChord(chordsArray, 'invalid');

    expect(result).toEqual({ error: 'Invalid rowID' });
  });
});
