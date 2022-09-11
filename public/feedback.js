const feedText = document.querySelector('#feedText');
const thanks = document.querySelector('#thanks');
thanks.classList.add('hide');

const baseURL = 'http://localhost:5044/api/project';

function addFeedback(event){
    event.preventDefault();

    let tName = document.querySelector('#textName');
    let fResponse = document.querySelector('#feedBack');

    let tObject = {
        name: tName.value,
        text: fResponse.value,
    }

    postFeedback(tObject);

    tName.value = "";
    fResponse.value = "";
}

function postFeedback(body){
    axios.post(`${baseURL}/postFeed/`, body)
    .then(thanks.classList.remove('hide'))
    .catch (err =>
        console.log(err));
}

feedText.addEventListener('submit', addFeedback);