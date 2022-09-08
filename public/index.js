console.log("Index....")

//Starting Game
const playBtn = document.querySelector('#play');
const divForm = document.querySelector('#nameForm');

//Ending Game
const ending = document.querySelector('.end-game');

//Buttons game
//Circles
const sixBtns = document.querySelector('.buttons3');
const wrongBtn = document.querySelector('.wrong');
const wrongBtn1 = document.querySelector('.wrong-1');
const wrongBtn2 = document.querySelector('.wrong-2');
const wrongBtn3 = document.querySelector('.wrong-3');
const wrongBtn4 = document.querySelector('.wrong-4');
const rightBtn = document.querySelector('.right');

//Rectangles
const fourBtns = document.querySelector('.buttons1');
const wrongBtn5 = document.querySelector('.wrong-5');
const wrongBtn6 = document.querySelector('.wrong-6');
const wrongBtn7 = document.querySelector('.wrong-7');
const rightBtn1 = document.querySelector('.right-r');

//Triangles
const fiveBtns = document.querySelector('.buttons2');
const wrongBtn8 = document.querySelector('.wrong-8');
const wrongBtn9 = document.querySelector('.wrong-9');
const wrongBtn10 = document.querySelector('.wrong-10');
const wrongBtn11 = document.querySelector('.wrong-11');
const rightBtn2 = document.querySelector('.right-t');

//Riddle
const riddleDiv = document.querySelector('#riddle-box');
const riddleBox = document.querySelector('#riddleForm');

const container = document.querySelector('#container');


divForm.classList.add('hide');

fourBtns.classList.add('hide');
fiveBtns.classList.add('hide');
sixBtns.classList.add('hide');

riddleBox.classList.add('hide');

ending.classList.add('hide');

const baseURL = 'http://localhost:5010/api/project';

function clickPlay (){
    playBtn.classList.add('hide');
    divForm.classList.remove('hide');
    divForm.addEventListener('submit', greeting);
}

function greeting (event){
    event.preventDefault();

    let name = document.querySelector('#fname');
    let nameObj = {
        name: name.value
    }
    //console.log(nameObj);
    sendName(nameObj);
}

function sendName(body){
    axios.post(`${baseURL}`, body)
    .then(
        (res) => {
            const data = res.data;
            alert(`Hello, ${data}! Let's get started`);
            firstRound()
        })
}

// function sendRiddle(body){
//     axios.post(`${baseURL}/riddle`, body)
//     .then(
//         (res) => {
//             const data1 = res.data;
//             response = data1
//             alert(response);
//         })
// }

function firstRound(){
    divForm.classList.add('hide');
    fourBtns.classList.remove('hide');
}

function rightChoiceTriangle(){
    fourBtns.classList.add('hide');
    fiveBtns.classList.remove('hide');
}

function rightChoiceRectangle(){
    fiveBtns.classList.add('hide');
    sixBtns.classList.remove('hide');
}

function riddler(){
    sixBtns.classList.add('hide');
    axios.get(`${baseURL}`)
    .then(res => {
        const data = res.data;
        console.log(data);
        guessRiddle(data);
    })
    //rating();
}

function guessRiddle(value){
    
    riddleBox.classList.remove('hide');

    const {question} = value;
    const {answer} = value;

    const riddleLabel = document.querySelector("#rr");
    riddleLabel.textContent = `${question}`;

    //riddleBox.appendChild(rBtn);
    //riddleDiv.appendChild(riddleBox);

    riddleBox.addEventListener("submit", checkAnswer(answer));            
}

function checkAnswer(solution){
    
    let rAnswer = document.querySelector("#riddle-answer");
    let rValue = rAnswer.value;
    let riddleSoln = solution;
    console.log(riddleSoln)
    console.log(rValue);
    // let data = response.toLowerCase();

    // if(data === riddleSoln)
    // {
    //     console.log(solution);
    //     console.log(user); 
    // }

    // else
    //     wrongChoice();

    // rightChoiceRectangle();

}

// function inputAnswer (event){
//     event.preventDefault();

//     let rAnswer = document.querySelector("#riddle-answer");
//     let rObj = {
//         rAnswer: rAnswer.value
//     }
//     //console.log(nameObj);
//     sendRiddle(rObj);
// }

function wrongChoice (){
    alert('Hmm.....not quite. Try again');
}

function rating(){
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('radio-div');
    
    ratingDiv.innerHTML = `

        <h3>Congratulations! You have made it!</h3>
        <h4>Please rate the app!</h4>
        <label for = "rating-1">1</label>
        <input type = "radio" id = "rating-1" name = "rating-1"><br>
        <label for = "rating-1">2</label>
        <input type = "radio" id = "rating-2" name = "rating-2"><br>
        <label for = "rating-1">3</label>
        <input type = "radio" id = "rating-3" name = "rating-3"><br>
        <label for = "rating-1">4</label>
        <input type = "radio" id = "rating-4" name = "rating-4"><br>
        <label for = "rating-1">5</label>
        <input type = "radio" id = "rating-5" name = "rating-5"><br>
        <button onClick = "endGame()">Submit</button>
        
    `
    container.appendChild(ratingDiv);
}

function endGame(){
    //ratingDiv.classList.add('hide');
    ending.classList.remove('hide');
    
}

playBtn.addEventListener('click', clickPlay);
riddleBox.addEventListener('click', riddler);
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
rightBtn.addEventListener('click', riddler);

