import express, { Request, Response } from 'express';
import { Modes } from './Modes';

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

//Route to submit a root/mode/tuning selection 
//The ... is just a placeholder for now
app.get('/api/mode', (req: Request, res: Response) => {
    res.send(); //Send the key and tuning as an object?
});

app.post('/api/mode', (req: Request, res: Response) => {
    let mode = new Modes(req.body.root, req.body.mode);
    const instance = mode.getModeMembers();
    //console.log("FROM BACKEND: ", instance);
    res.send(instance);
});

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Error: Page Not Found');
})