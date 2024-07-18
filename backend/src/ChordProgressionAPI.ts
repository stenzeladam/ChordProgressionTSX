import express, { Request, Response } from 'express';
import { Modes } from './Modes';
import { Chord } from './Chord';
import { ChordVoicing } from './ChordVoicing';

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

app.post('/api/add/chord', async (req: Request, res: Response) => { //Expected to be called line 69 in SelectionContainer.tsx
    const data = req.body;
    let tempChord = new Chord(data.numeral, data.mode.scale, data.mode.chromatic);
    tempChord.buildChord();
    let tempVoicing = new ChordVoicing(tempChord.getNotes(), data.compensate, data.tuning);
    tempVoicing.tuneEachString();
    let chordData = await createCallandInterpretData(tempVoicing);
    let chordDataInterfaceArr = chordData?.getDATA();
    let chordsArr = data.chordsArray;
    let chordNumeral: string = convertToRoman(data.numeral);
    if (chordDataInterfaceArr && chordDataInterfaceArr.length > 0) {
        const nameArr: string[] = chordDataInterfaceArr[0].CHORD_NAME.split(',');
        let tempName: string = ""
        for (let i = 0; i < nameArr.length; i++) {
            tempName = tempName + nameArr[i];
        }
        chordDataInterfaceArr[0].CHORD_NAME = tempName;
        chordsArr = [
            ...chordsArr,
            {
                numeral: chordNumeral,
                chord_name: chordDataInterfaceArr[0].CHORD_NAME,
                chord_tabs: chordDataInterfaceArr[0].STRINGS.replace(/ /g, '-'),
                chord_notes: chordDataInterfaceArr[0].TONES
            }
        ];
    }
    res.send(chordsArr);
});

async function createCallandInterpretData(param: ChordVoicing) {
      try {
          const calledChordData = await param.fetchChordDataByVoicing(param.convertNotesToVoicing());
          return calledChordData;
  
      } catch (error) {
          console.error('Error fetching or creating instance:', error);
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