let vocab = [];
let currentIndex = 0;
let showingAnswer = false;

function nextQuestionOrAnswer() {
    if (vocab.length === 0) return;

    if (currentIndex >= vocab.length) {
        hideCard();
        showButtons();
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
                vocab = JSON.parse(e.target.result);
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
}

function showButtons() {
    const uploadButton = document.createElement('button');
    uploadButton.innerText = 'Upload';
    uploadButton.id = 'uploadButton';
    uploadButton.onclick = uploadJson;

    document.body.appendChild(uploadButton);

    const startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.id = 'startButton';
    startButton.onclick = start;

    document.body.appendChild(startButton);
}

function hideButtons() {
    const upload = document.getElementById('uploadButton');
    document.body.removeChild(upload);

    const start = document.getElementById('startButton');
    document.body.removeChild(start);
}

function showCard() {
    const card = document.createElement('div');
    card.id = 'card';
    card.onclick = nextQuestionOrAnswer;

    document.body.appendChild(card);
}

function hideCard() {
    const card = document.getElementById('card');
    document.body.removeChild(card);
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
    hideButtons();
    showCard();
    showQuestion();
}

window.onload = () => {
    showButtons();
}