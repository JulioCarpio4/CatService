import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { scopePerRequest } from 'awilix-express'

import routesHandler from '../app/v2/routes/catRoutes.js'
import { createAppContainer } from '../app/v2/containers/appFactory.js'


const PORT = process.env.PORT || 3001
const HOST = '0.0.0.0'
const corsOptions = {
    origin: '*'
}

const app = express()
const container = await createAppContainer()

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(scopePerRequest(container))
app.use('/api/v2/cats', routesHandler())

app.listen(PORT, HOST);