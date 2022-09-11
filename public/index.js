let ridAnswer, ridHint;
let wrongCount = 0;
let fruitName = 'Watermelan';

const playBtn1 = document.querySelector('.play1');
const playBtn2 = document.querySelector('.play2');
const yesBtn = document.querySelector('#yes');
const noBtn = document.querySelector('#no');
const addRid = document.querySelector('#insert');

const riddleBox = document.querySelector('.riddle-box');
const riddleForm = document.querySelector('#riddleForm');

// const tableBox = document.querySelector('.maze-T');
// const tableBody = document.querySelector('.maze-tBody');

//Buttons game
//Circles
const wrongBtn = document.querySelector('.wrong');
const wrongBtn1 = document.querySelector('.wrong-1');
const wrongBtn2 = document.querySelector('.wrong-2');
const wrongBtn3 = document.querySelector('.wrong-3');
const wrongBtn4 = document.querySelector('.wrong-4');
const rightBtn = document.querySelector('.right');

//Rectangles
const wrongBtn5 = document.querySelector('.wrong-5');
const wrongBtn6 = document.querySelector('.wrong-6');
const wrongBtn7 = document.querySelector('.wrong-7');
const rightBtn1 = document.querySelector('.right-r');

//Triangles
const wrongBtn8 = document.querySelector('.wrong-8');
const wrongBtn9 = document.querySelector('.wrong-9');
const wrongBtn10 = document.querySelector('.wrong-10');
const wrongBtn11 = document.querySelector('.wrong-11');
const rightBtn2 = document.querySelector('.right-t');

const buttons1 = document.querySelector('.buttons1');
const buttons2 = document.querySelector('.buttons2');
const buttons3 = document.querySelector('.buttons3');
const fruitList = document.querySelector('.fruit-list');

const threeBoxes = document.querySelector('.three-boxes');
const replayDiv = document.querySelector(".replayDiv");
const postDiv = document.querySelector(".postDiv");
const postRiddle = document.querySelector("#postRiddle");
const showWord = document.querySelector("#show");
const fruitNinja = document.querySelector('.fruit-ninja');
//const mazeBox = document.querySelector(".A-maze-zing");

riddleBox.classList.add('hide');
replayDiv.classList.add('hide');
postDiv.classList.add('hide');
showWord.classList.add('hide');

buttons1.classList.add('hide');
buttons2.classList.add('hide');
buttons3.classList.add('hide');
fruitList.classList.add('hide');
fruitNinja.classList.add('hide');

const baseURL = 'http://localhost:5044/api/project';

// function greeting (event){
//     event.preventDefault();
//     divForm.classList.add('hide');

//     let name = document.querySelector('#fname').value;

//     const nameDiv = document.createElement('div');
//     nameDiv.classList.add('nDiv');

//     nameDiv.innerHTML = `Hello ${name}! Thanks for playing!`;
//     container.appendChild(nameDiv);

//     //firstRound();
// }

function firstRound(){
    threeBoxes.classList.add('hide');
    buttons1.classList.remove('hide');
}

function rightChoiceTriangle(){
    buttons1.classList.add('hide');
    buttons2.classList.remove('hide');
}

function rightChoiceRectangle(){
    buttons2.classList.add('hide');
    buttons3.classList.remove('hide');
}

function fruity(fData){

    const {image} = fData
    
    fruitList.innerHTML = ``;
    
    for(i = 0; i < fData.length; i++){
        if (fData[i].name === 'Watermelan')
        {
            createWrongItem(fData[i]);
            fruitImage = image;
            console.log(fruitImage)
        }
        else
            createListItem(fData[i]);
    }
}

function createListItem(item){
    buttons3.classList.add('hide');
    fruitList.classList.remove('hide');
    const listCard = document.createElement('div');
    listCard.classList.add("listCSS");

    listCard.innerHTML = `
        <img alt = 'fruit-image' src = ${item.image} class = "imageCSS"/>
        <button onclick = "wrongChoice()">${item.name}</button>
    `
    fruitList.appendChild(listCard);
}

function createWrongItem(item){
    const listCard2 = document.createElement('div');
    listCard2.classList.add("listCSS");

    listCard2.innerHTML = `
        <img alt = 'fruit-image' src = ${item.image} class = "imageCSS"/>
        <button onclick = "deleteChoice(${item.id})">${item.name}</button>
    ` 
    fruitList.appendChild(listCard2);
}

function wrongChoice(){
    alert("Hmm...not quite");
}

function success(){
    fruitList.classList.add('hide');
    fruitNinja.classList.remove('hide');

    const fruitDiv = document.createElement('div');

    fruitDiv.innerHTML = `
        <h3>You got it correct! Watermelon was spelled: </h3>
        <h5>Watermelan</h5>
        <br>
        <h4>Click anywhere to return to the home screen</h4>
    `
    fruitNinja.appendChild(fruitDiv);
    fruitNinja.addEventListener('click', close, true);
}

function getFruits(){
    axios.get(`${baseURL}/fruits`)
    .then(res => {
        const fruitData = res.data;
        console.log(fruitData);
        fruity(fruitData);
    })
    .catch(err =>
        console.log(err.data))
}

function deleteChoice(id){
    axios.delete(`${baseURL}/${id}`)
    .then(res => {
            const fruitData = res.data;
            success();
    })
    .catch(err =>
        console.log(err.data))
}

function riddler(){
    axios.get(`${baseURL}`)
    .then(res => {
        const data = res.data;
        console.log(data);
        guessRiddle(data)
    })
    .catch(err =>
        console.log(err.data))
}

function postRiddles(body){
    axios.post(`${baseURL}/postRiddle/`, body)
    .then(res => {
        const data1 = res.data;
        console.log(data1);
        let {question, answer, hint} = data1;

        alert(`You have successfully added the following riddle:
                ${question}
                ${answer}
                ${hint}`);
        playAgain();
    })
    .catch(err =>
        console.log(err.data))
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
        inputAnswer.value = "";
        ridAnswer = "";
        ridHint = "";
        wrongCount = 0;
        let removeBtn = document.querySelector('#ridBtn');
        let removeAnswer = document.querySelector('#riddlerAnswer');
        riddleForm.removeChild(removeBtn);
        riddleForm.removeChild(removeAnswer);

        playAgain();
    }
    else
    {
        inputAnswer.value = "";
        wrongAnswer();
    }
}

function wrongAnswer(){
    alert("Hmm...Not quite");
    wrongCount++;
    console.log(wrongAnswer);

    if(wrongCount >= 3 && wrongCount < 5){
        showWord.classList.remove('hide');
        showWord.textContent = `Hint: ${ridHint}`;
    }
    else if(wrongCount === 5){
        wrongCount = 0;
        let removeBtn = document.querySelector('#ridBtn');
        let removeAnswer = document.querySelector('#riddlerAnswer');
        riddleForm.removeChild(removeBtn);
        riddleForm.removeChild(removeAnswer)
        showWord.textContent = `
        Sorry! Too many tries! The answer was ${ridAnswer}.
        Click anywhere to continue.
        `
        document.body.addEventListener('click', playAgain, true);
    }
}

function playAgain(){

    console.log('Hurray!');
    document.body.removeEventListener('click', playAgain, true);
    riddleBox.classList.add('hide');
    postDiv.classList.add('hide');
    showWord.classList.add('hide');
    replayDiv.classList.remove('hide');

    yesBtn.addEventListener("click", replay);
    noBtn.addEventListener("click", close);
    addRid.addEventListener("click", postRid);
}    

function replay(event){
    event.preventDefault();

    replayDiv.classList.add('hide');
    riddler();
}

function close(event){
    event.preventDefault();

    replayDiv.classList.add('hide');
    fruitNinja.classList.add('hide');
    threeBoxes.classList.remove('hide');
}

function postRid(event){
    event.preventDefault();

    replayDiv.classList.add('hide');
    postDiv.classList.remove('hide');
    postRiddle.addEventListener("submit", addRiddles);    
}

function addRiddles(event){
    event.preventDefault();

    let rQuestion = document.querySelector("#rQuestion");
    let aQuestion = document.querySelector("#aQuestion");
    let hQuestion = document.querySelector("#hintQ");

    let rObject = {
        riddle: rQuestion.value,
        answers: aQuestion.value,
        hint: hQuestion.value
    }
    console.log(rObject);

    postRiddles(rObject);

    rQuestion.value = "";
    aQuestion.value = "";
    hQuestion.value = "";
}

// function createMaze(){
//     let rowIndex, colIndex;
//     let tableLength = 9;
//     for (rowIndex = 0; rowIndex < tableLength; rowIndex++){
//         const row = document.createElement("tr");

//         for(colIndex = 0; colIndex < tableLength; colIndex++){
//             const col = document.createElement("td");
//             col.setAttribute("id", "columns");
//             col.classList.add("columns");
//             if(rowIndex === 0 && colIndex ===0)
//             {
//                 col.setAttribute("type", "start");
//                 col.setAttribute("id", "starts");
//                 col.classList.add("begin");
//             }
//             else if(rowIndex === tableLength && colIndex === tableLength)
//             {
//                 col.style.backgroundColor = "rgb(244,0,0)";
//                 col.setAttribute("type", "finish");
//                 col.setAttribute("id", "finishes");
//                 col.classList.add("end");
//             }
//         }
//         row.appendChild(col);
//     }
// }

playBtn1.addEventListener('click', firstRound);
playBtn2.addEventListener('click', riddler);

wrongBtn.addEventListener('click', wrongChoice);
wrongBtn1.addEventListener('click', wrongChoice);
wrongBtn2.addEventListener('click', wrongChoice);
wrongBtn3.addEventListener('click', wrongChoice);
wrongBtn4.addEventListener('click', wrongChoice);
wrongBtn5.addEventListener('click', wrongChoice);
wrongBtn6.addEventListener('click', wrongChoice);
wrongBtn7.addEventListener('click', wrongChoice);
wrongBtn8.addEventListener('click', wrongChoice);
wrongBtn9.addEventListener('click', wrongChoice);
wrongBtn10.addEventListener('click', wrongChoice);
wrongBtn11.addEventListener('click', wrongChoice);

rightBtn1.addEventListener('click', rightChoiceTriangle);
rightBtn2.addEventListener('click', rightChoiceRectangle);
rightBtn.addEventListener('click', getFruits);
