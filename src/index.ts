import express from 'express';
import { appRouter } from './routes';

const app = express();

app.use(express.json());
app.use(appRouter);

app.listen(3000, ()=>{
    console.log("App is running!")
})