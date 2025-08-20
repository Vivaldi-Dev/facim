import express from 'express';
import type { Express,Request,Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';


dotenv.config();

const PORT = process.env.PORT || 3000;

const app:Express = express ();

app.use(express.json());

app.use('/api', router);

app.get('/' , (req:Request, res:Response) => {
    res.send('work ');
})

app.listen (PORT , () => {
    console.log(`server is runnig on port ${PORT}`)
})