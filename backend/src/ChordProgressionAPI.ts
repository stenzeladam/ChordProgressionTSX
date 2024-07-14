import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());

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
app.get('/...', (req: Request, res: Response) => {
    res.send(); //Send the key and tuning as an object?
});

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Error: Page Not Found');
})