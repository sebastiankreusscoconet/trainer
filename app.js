let vocab = [];
let currentIndex = 0;
let showingAnswer = false;

function nextQuestionOrAnswer() {
    if (vocab.length === 0) return;

    if (currentIndex + 1 === vocab.length && showingAnswer) {
        hideCard();
        showUploadButton();
        showStartButton();
        return;
    }

    if (showingAnswer) {
        currentIndex++;
        showQuestion();
    } else {
        showAnswer();
    }
}

function uploadJson() {
    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'fileInput';
    input.accept = 'application/json';
    input.style.display = 'none';
    input.onchange = onUploadJson;
    input.click();
}

function onUploadJson(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            hideStartButton();
            try {
                vocab = JSON.parse(e.target.result);
            } catch (error) {
                alert('Invalid JSON file');
            }
            showStartButton();
        };
        reader.readAsText(file);
    }
}

function showUploadButton() {
    const uploadButton = document.createElement('button');
    uploadButton.innerText = 'Upload';
    uploadButton.id = 'uploadButton';
    uploadButton.onclick = uploadJson;

    document.body.appendChild(uploadButton);
}

function showStartButton() {
    const startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.id = 'startButton';
    startButton.onclick = start;

    document.body.appendChild(startButton);
}

function hideUploadButton() {
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton !== null) {
        document.body.removeChild(uploadButton);
    }

}

function hideStartButton() {
    const startButton = document.getElementById('startButton');
    if (startButton !== null) {
        document.body.removeChild(startButton);
    }
}

function showCard() {
    const card = document.createElement('div');
    card.id = 'card';

    document.body.appendChild(card);
}

function hideCard() {
    const card = document.getElementById('card');
    if (card !==  null) {
        document.body.removeChild(card);
    }
}

function showQuestion() {
    showingAnswer = false;
    document.getElementById('card').innerHTML = vocab[currentIndex].question.replaceAll("\n", "<br>");
}

function showAnswer() {
    showingAnswer = true;
    document.getElementById('card').innerHTML = vocab[currentIndex].answer.replaceAll("\n", "<br>");
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function start() {
    currentIndex = 0;
    vocab = shuffleArray(vocab);
    hideUploadButton();
    hideStartButton();
    showCard();
    showQuestion();
}

window.ontouchstart = () => {
    const card = document.getElementById('card');
    if (card !== null) {
        nextQuestionOrAnswer();
    }
}

window.onload = () => {
    showUploadButton();
}