let ridAnswer, ridHint;

const playBtn2 = document.querySelector('.play2');
const yesBtn = document.querySelector('#yes');
const noBtn = document.querySelector('#no');
const addRid = document.querySelector('#insert');

const riddleBox = document.querySelector('.riddle-box');
const riddleForm = document.querySelector('#riddleForm');

const tableBox = document.querySelector("maze-T");
const tableBody = document.querySelector("maze-tBody");

const threeBoxes = document.querySelector('.three-boxes');
const mazeBox = document.querySelector("A-maze-zing");
const replayDiv = document.querySelector(".replayDiv");
const postDiv = document.querySelector(".postDiv");
const postRiddle = document.querySelector("#postRiddle");

riddleBox.classList.add('hide');
replayDiv.classList.add('hide');
postDiv.classList.add('hide');

const baseURL = 'http://localhost:5010/api/project';

function riddler(){
    axios.get(`${baseURL}`)
    .then(res => {
        const data = res.data;
        console.log(data);
        guessRiddle(data)
    })
}

function postRiddles(body){
    axios.post(`${baseURL}/postRiddle/`, body)
    .then(res => {
        const data1 = res.data;
        console.log(data1);
        let {question, answer} = data1;

        alert(`You have successfully added the following riddle:
                ${question}
                ${answer}`);
        playAgain();
    })
}

function guessRiddle(value){
    
    threeBoxes.classList.add('hide');
    riddleBox.classList.remove('hide');

    const {question} = value;
    ridAnswer = value.answer;
    ridHint = value.hint;

    const riddleLabel = document.querySelector("#rr");
    riddleLabel.textContent = `${question}`;

    const riddleAnswer = document.createElement('input');
    riddleAnswer.setAttribute("type", "text");
    riddleAnswer.setAttribute("id", "riddlerAnswer");
    riddleAnswer.setAttribute("name", "riddlerAnswer");

    const riddleBtn = document.createElement('input');
    riddleBtn.setAttribute("type", "submit");
    riddleBtn.setAttribute("id", "ridBtn");
    riddleBtn.setAttribute("value", "Submit");
    
    riddleForm.appendChild(riddleAnswer);
    riddleForm.appendChild(riddleBtn);
    
    riddleBox.addEventListener("submit", getAnswer);
}

function getAnswer(event){
    event.preventDefault();

    let inputAnswer = document.querySelector('#riddlerAnswer');
    let inputValue = inputAnswer.value;
    console.log(inputValue);

    let lowerInputAnswer = inputValue.toLowerCase();
    
    if(lowerInputAnswer === ridAnswer)
    {
        console.log('Hurray!');
        inputAnswer.value = "";
        ridAnswer = "";
        ridHint = "";
        let removeBtn = document.querySelector('#ridBtn');
        let removeAnswer = document.querySelector('#riddlerAnswer');
        riddleForm.removeChild(removeBtn);
        riddleForm.removeChild(removeAnswer);

        playAgain();

    }
    else
    {
        inputAnswer.value = "";
        wrongChoice();
    }

}

function wrongChoice(){
    alert("Hmm...Not quite");
}

function playAgain(){
    console.log('Hurray!');
    riddleBox.classList.add('hide');
    postDiv.classList.add('hide');
    replayDiv.classList.remove('hide');

    yesBtn.addEventListener("click", replay);
    noBtn.addEventListener("click", close);
    addRid.addEventListener("click", postRid);
}    


function replay(){
    replayDiv.classList.add('hide');
    riddler();
}

function close(){
    replayDiv.classList.add('hide');
    threeBoxes.classList.remove('hide');
}

function postRid(){
    replayDiv.classList.add('hide');
    postDiv.classList.remove('hide');
    postRiddle.addEventListener("submit", addRiddles);    
}

function addRiddles(event){
    event.preventDefault();

    let rQuestion = document.querySelector("#rQuestion");
    let aQuestion = document.querySelector("#aQuestion");

    let rObject = {
        riddle: rQuestion.value,
        answers: aQuestion.value
    }
    console.log(rObject);

    postRiddles(rObject);

    rQuestion.value = "";
    aQuestion.value = "";
}

function createMaze(){
    let rowIndex, colIndex;
    let tableLength = 9;
    for (rowIndex = 0; rowIndex < tableLength; rowIndex++){
        const row = document.createElement("tr");

        for(colIndex = 0; colIndex < tableLength; colIndex++){
            const col = document.createElement("td");
            col.setAttribute("id", "columns");
            col.classList.add("columns");
            if(rowIndex === 0 && colIndex ===0)
            {
                col.setAttribute("type", "start");
                col.setAttribute("id", "starts");
                col.classList.add("begin");
            }
            else if(rowIndex === tableLength && colIndex === tableLength)
            {
                col.style.backgroundColor = "rgb(244,0,0)";
                col.setAttribute("type", "finish");
                col.setAttribute("id", "finishes");
                col.classList.add("end");
            }
        }
        row.appendChild(col);
    }


}

playBtn2.addEventListener('click', riddler);