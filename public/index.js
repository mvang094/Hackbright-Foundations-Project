console.log("Index....")

//Starting Game
const playBtn = document.querySelector('#play');
const divForm = document.querySelector('#nameForm');

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

let circleBtns = [];

divForm.classList.add('hide');
fourBtns.classList.add('hide');
fiveBtns.classList.add('hide');
sixBtns.classList.add('hide');

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
            firstRound()})
}

function firstRound(){
    divForm.classList.add('hide');
    fourBtns.classList.remove('hide');
}

function rightChoiceTriangle(){
    fourBtns.classList.add('hide');
    return fiveBtns.classList.remove('hide');
}

function rightChoiceRectangle(){
    fiveBtns.classList.add('hide');
    return sixBtns.classList.remove('hide');
}

function roundTwo(){
    sixBtns.classList.add('hide');
}

function wrongChoice (){
    alert('Hmm.....not quite');
}

playBtn.addEventListener('click', clickPlay);
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
rightBtn.addEventListener('click', roundTwo);
