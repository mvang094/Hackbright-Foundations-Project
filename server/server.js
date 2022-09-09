const express = require("express");
const cors = require("cors");
const {riddles} = require("./data.js");
// const shuffleBtns = require("./shuffle.js")

let newId = 5;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/project', (req, res) => {
    let question;
    
    for (i = 0; i < riddles.length; i++){
        const j = Math.floor(Math.random()*riddles.length);
        question = riddles[j];
    }
    
    res.status(200).send(question);
})

app.post('/api/project/postRiddle', (req, res) => {
    let {riddle, answers} = req.body;
    // let {id} = riddles;

    let newResponse = {
        id: newId,
        question: riddle,
        answer: answers,  
    }
    newId++;

    riddles.push(newResponse)

    res.status(200).send(newResponse);
})

const SERVER_PORT = 5010;
app.listen(SERVER_PORT, () => console.log(`Server is on port ${SERVER_PORT}`));
