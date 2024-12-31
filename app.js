let vocab = [];
let currentIndex = 0;
let showingAnswer = false;

function nextQuestionOrAnswer() {
    if (vocab.length === 0) return;

    if (currentIndex + 1 >= vocab.length) {
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
            try {
                hideStartButton();
                vocab = JSON.parse(e.target.result);
                showStartButton();
            } catch (error) {
                alert('Invalid JSON file');
            }
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
    const upload = document.getElementById('uploadButton');
    if (upload !== undefined) {
        document.body.removeChild(upload);
    }

}

function hideStartButton() {
    const start = document.getElementById('startButton');
    if (start !== undefined) {
        document.body.removeChild(start);
    }
}

function showCard() {
    const card = document.createElement('div');
    card.id = 'card';

    document.body.appendChild(card);
}

function hideCard() {
    const card = document.getElementById('card');

    if (card !==  undefined) {
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
    if (card !== undefined) {
        nextQuestionOrAnswer();
    }
}

window.onload = () => {
    showUploadButton();
}