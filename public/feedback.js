const feedText = document.querySelector('#feedText');
const thanks = document.querySelector('#thanks');
thanks.classList.add('hide');

const baseURL = 'http://localhost:5095/api/project';

function addFeedback(event){
    event.preventDefault();

    let fResponse = document.querySelector('#feedBack');

    let tObject = {
        text: fResponse.value,
    }
    console.log(tObject.text);

    postFeedback(tObject);

    fResponse.value = "";
}

function postFeedback(body){
    axios.post(`${baseURL}/postFeed/`, body)
    .then(thanks.classList.remove('hide'))
    .catch (err =>
        console.log(err.data));
}

feedText.addEventListener('submit', addFeedback);