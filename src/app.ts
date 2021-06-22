import { json } from 'body-parser';
import express from 'express';
import { baseRouter } from './routes';
import { endRouter } from './routes/end';
import { moveRouter } from './routes/move';
import { startRouter } from './routes/start';

const app = express();

app.use(json());

app.use(baseRouter);
app.use(startRouter);
app.use(moveRouter);
app.use(endRouter);

export { app };
