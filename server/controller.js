require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const {riddles, odd} = require("./data.js");

let newId = 11;
let feedId = 0;

module.exports = {

    getFruit: (req, res) => {
        res.status(200).send(odd);
    },

    deleteFruit: (req, res) => {
        const id = +req.params.id;
        const index = odd.findIndex(e => e.id === id);
        odd.splice(index, 1);
        res.status(200).send(odd);
    },

    getRiddle: (req, res) => {
        let question;
    
        for (i = 0; i < riddles.length; i++){
            const j = Math.floor(Math.random()*riddles.length);
            question = riddles[j];
        }
    
        res.status(200).send(question);
    },

    postForm: (req, res) => {
        let {riddle, answers, hint} = req.body;

        let newResponse = {
            id: newId,
            question: riddle,
            answer: answers,
            hint: hint  
        }
        newId++;

        riddles.push(newResponse)

        res.status(200).send(newResponse);
    },

    postResponse: (req, res) => {

        let {name, text} = req.body;
        sequelize.query(`INSERT into feedback (name, response, text_id)
            VALUES(${name}, ${text}, feedId)`)
            .then(res.sendStatus(200))
            .catch(err => console.log(err))

        feedId++;
    },

    seed: (req, res) => {

        sequelize.query(`
            drop table if exists feedback;

            create table feedback (
                text_id serial primary key, 
                name varchar,
                response varchar
            );
        `)
    }
}