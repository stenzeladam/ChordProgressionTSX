import express, { Request, Response } from 'express';
import { Modes } from './Modes';
import { addChord, deleteChord } from './helpers';

export interface ChordInterface {
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

//Root URL
app.get('/', (req: Request, res: Response) => {
    res.send('Chord Progression Tool');
});

app.post('/api/mode', (req: Request, res: Response) => {
    let mode = new Modes(req.body.root, req.body.mode);
    const instance = mode.getModeMembers();
    res.send(instance);
});

app.post('/api/add/chord', async (req: Request, res: Response) => { 
    const data = req.body;
    try {
        console.log(await addChord(data));
        res.send(await addChord(data));
    } catch (error) {
        res.send(error)
    }
    // TODO: Write actual error handling that doesn't send error information to the front end, and keeps it restricted to the server logs
});

app.delete('/api/delete/chord', (req: Request, res: Response) => {
    const { chordsArray: serializedChordsArray, rowID } = req.query;
  
    const result = deleteChord(serializedChordsArray as string, rowID as string);
  
    if ('error' in result) {
      return res.status(400).json(result);  // Handle errors returned from the helper function
    }
  
    res.status(200).json(result);  // Send the updated chords array
  });

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Error: Page Not Found');
});

export default app;