import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { catRoutes } from './v3/routes/catRoutes.js';

const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: '*'
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));


// V3 -> TypeScript and Express approach
app.use('/api/v3/cats', catRoutes());

app.listen(PORT);