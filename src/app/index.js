import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { router } from '../app/v1/routes/catRoutes.js'

const PORT = process.env.PORT || 3001
const HOST = '0.0.0.0'
const corsOptions = {
    origin: '*'
}

const app = express()

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use('/api/v1/cats', router)

app.listen(PORT, HOST);