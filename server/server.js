require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {SERVER_PORT} = process.env;
const app = express();
const {seed, getFruit, deleteFruit, getRiddle, 
        postForm, postResponse} = require('./controller.js');

app.use(cors());
app.use(express.json());

app.post('/api/project/seed', seed);

app.get('/api/project/fruits', getFruit);
app.delete('/api/project/:id', deleteFruit)
app.get('/api/project', getRiddle)
app.post('/api/project/postRiddle', postForm)
app.post('/api/project/postFeed', postResponse)

app.listen(SERVER_PORT, () => console.log(`Server is on port ${SERVER_PORT}`));
