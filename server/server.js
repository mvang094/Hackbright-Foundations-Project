const express = require("express");
const cors = require("cors");
const {riddles} = require("./data.js");
// const shuffleBtns = require("./shuffle.js")

const app = express();

app.use(cors());

app.use(express.json());

app.post('/api/project', (req, res) => {
    let {name} = req.body;
    res.status(200).send(name);
})

// app.post('/api/project/riddle', (req, res) => {
//     let {rAnswer} = req.body;
//     res.status(200).send(rAnswer);
// })

app.get('/api/project', (req, res) => {
    let question;
    
    for (i = 0; i < riddles.length; i++){
        const j = Math.floor(Math.random()*riddles.length);
        question = riddles[j];
    }
    
    res.status(200).send(question);
})

const SERVER_PORT = 5010;
app.listen(SERVER_PORT, () => console.log(`Server is on port ${SERVER_PORT}`));
