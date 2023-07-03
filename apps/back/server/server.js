import express from 'express'
import cors from 'cors'
import { createFile } from '../src/world/saveWorld.js'
import { signeData, verifySignature } from '../src/signer/signer.js'
import { developmentModeIsActive } from '../env/mode.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/saveWorld/:content', (req, res) => {
    createFile(req.params.content, '../../front/savedWorld.json')
})

app.get('/signData/:content', (req, res) => {
    const signature = signeData(req.params.content, '../src/signer/keys.json')
    res.send(signature) 
})

app.get('/verifyDataSignature/:content/:signature', (req, res) => {
    const sAreTheSame = verifySignature(req.params.content, req.params.signature) 
    res.send(sAreTheSame.toString())
})

app.get('/appMode', (req, res) => {
    res.send(developmentModeIsActive())
})

app.listen(3000, () => {
    console.log('Serveur express écoute sur port 3000')
})
