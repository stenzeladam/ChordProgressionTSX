import express, { Request, Response } from 'express';
import { Modes } from './Modes';
import { Chord } from './Chord';
import { ChordVoicing } from './ChordVoicing';
import { CustomChordData } from './CustomChordData';

interface ChordInterface {
    rowID: number,
    numeral: string,
    chord_name: string[],
    chord_tabs: string[],
    chord_notes: string,
  }

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin === "http://localhost:1234") {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // If this is a preflight request, respond with 200 status
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

//Root URL
app.get('/', (req: Request, res: Response) => {
    res.send('Chord Progression Tool');
});

app.post('/api/mode', (req: Request, res: Response) => {
    let mode = new Modes(req.body.root, req.body.mode);
    const instance = mode.getModeMembers();
    res.send(instance);
});

app.post('/api/add/chord', async (req: Request, res: Response) => { // Expected to be called line 67 in SelectionContainer.tsx
    
    const data = req.body;
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
        let last = chordsArr.length-1;
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
    res.send(chordsArr);
});

app.delete('/api/delete/chord', (req: Request, res: Response) => {
    const { chordsArray: serializedChordsArray, rowID } = req.query;
  
    if (!serializedChordsArray || typeof rowID !== 'string') {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }
  
    try {
      const parsedChordsArray = JSON.parse(serializedChordsArray as string) as ChordInterface[];
      const idToDelete = parseInt(rowID, 10);
  
      if (isNaN(idToDelete)) {
        return res.status(400).json({ error: 'Invalid rowID' });
      }
  
      const newChordsArray = parsedChordsArray.filter((chord) => chord.rowID !== idToDelete);
      res.status(200).json(newChordsArray);
    } catch (error) {
      console.error('Error parsing chords array:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

async function createVoicingsAndData(param: ChordVoicing) {
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

function convertToRoman(num: number): string {
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

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Error: Page Not Found');
});