const playBtn2 = document.querySelector('.play2');
const riddleBox = document.querySelector('.riddle-box');
const riddleForm = document.querySelector('#riddleForm');

const threeBoxes = document.querySelector('.three-boxes');

riddleBox.classList.add('hide');

const baseURL = 'http://localhost:5010/api/project';

function riddler(){
    axios.get(`${baseURL}`)
    .then(res => {
        const data = res.data;
        console.log(data);
        guessRiddle(data);
    })
}

function guessRiddle(value){
    
    threeBoxes.classList.add('hide');
    riddleBox.classList.remove('hide');
    // riddleBox.classList.add('riddling');

    const {question} = value;
    const {answer} = value;

    const riddleLabel = document.querySelector("#rr");
    riddleLabel.textContent = `${question}`;

    riddleBox.addEventListener("submit", checkAnswer(answer));    
    
    //Issue: how to get the answer dynamically?
    //something is making it submit before I can submit
    //How do I compare input with solution?
}

// function checkAnswer(solution){
    
//     // let rAnswer = document.querySelector("#riddle-answer");
//     // let rValue = rAnswer.value;
//     let riddleSoln = solution;
//     let data = ridAnswer.toLowerCase();
//     console.log(riddleSoln)
//     console.log(data);
    
//     if(data === riddleSoln)
//     {
//         rightChoiceRectangle;
//     }
//    else
//    {
//         alert("try again");
//         guessRiddle();
//    }

playBtn2.addEventListener('click', riddler);