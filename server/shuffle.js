const shuffle = (arr) => {
    let arrCopy = [...arr];

    for (i = arrCopy.length - 1; i > 0; i--){
        const j = Math.floor(Math.random()*arrCopy.length);
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }

    return arrCopy;
}

module.exports = {
    shuffle
}