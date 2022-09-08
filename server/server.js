const express = require("express");
const cors = require("cors");
// const {circle} = require("./data.js");
// const shuffleBtns = require("./shuffle.js")

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/index.css', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.css'))
})
app.get('/index.js', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.js'))
})

app.post('/api/project', (req, res) => {
        let {name} = req.body;
        res.status(200).send(name);
})

// app.get('/api/project', (req, res) => {
//     try{
//         let shuffled = shuffleBtns(circle)
//         res.status(200).send(shuffled);
//     }
//     catch (err){
//         console.log(err);
//         res.sendStatus(400);
//     }
// })

const SERVER_PORT = 5010;
app.listen(SERVER_PORT, () => console.log(`Server is on port ${SERVER_PORT}`));
