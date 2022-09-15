require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require('path');
const {SERVER_PORT} = process.env;
const app = express();
const {getFruit, deleteFruit, getRiddle, 
        postForm, postResponse, getWords, getMan, postWord, seed} = require('./controller.js'); //seed

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

app.post('/api/project/seed', seed);

app.get('/api/project/fruits', getFruit);
app.get('/api/project', getRiddle);
app.get('/api/project/word', getWords)
app.get('/api/project/man', getMan);
app.post('/api/project/postRiddle', postForm);
app.post('/api/project/postWord', postWord);
app.post('/api/project/postFeed/', postResponse);
app.delete('/api/project/:id', deleteFruit);

// const SERVER_PORT = 5000;
app.listen(SERVER_PORT, () => console.log(`Server is on port ${SERVER_PORT}`));
