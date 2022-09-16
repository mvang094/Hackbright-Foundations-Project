require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require('path');
//const {SERVER_PORT} = process.env;
const app = express();
const {getFruit, deleteFruit, getRiddle, 
        postForm, postResponse, getWords, getMan, postWord, seed} = require('./controller.js');

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../index.html'))
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

//SERVER_PORT = 5095;
const port = process.env.PORT || 5095;
app.listen(port, () => console.log(`Server is on port ${port}`));
