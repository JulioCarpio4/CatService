import express from 'express'
import bodyParser from 'body-parser'

import { router } from './v1/routes/catRoutes.js'

const PORT = process.env.PORT || 3001
const HOST = '0.0.0.0'

const app = express()

app.use(bodyParser.json())
app.use('/api/v1/cats', router)

app.listen(PORT, HOST);