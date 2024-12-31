let vocab = [];
let currentIndex = 0;
let showingAnswer = false;

function nextQuestionOrAnswer() {
    if (vocab.length === 0) return;

    if (currentIndex >= vocab.length) {
        hideCard();
        showUploadForm();
    }

    if (showingAnswer) {
        currentIndex++;
        showQuestion();
    } else {
        showAnswer();
    }
}

function uploadJson(event) {
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

function showUploadForm() {
    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'fileInput';
    input.accept = 'application/json';
    input.onchange = uploadJson;

    document.body.appendChild(input);

    const button = document.createElement('button');
    button.innerText = 'Start';
    button.id = 'startButton';
    button.onclick = start;

    document.body.appendChild(button);
}

function hideUploadForm() {
    const input = document.getElementById('fileInput');
    document.body.removeChild(input);

    const button = document.getElementById('startButton');
    document.body.removeChild(button);
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
    hideUploadForm();
    showCard();
    showQuestion();
}

window.onload = () => {
    showUploadForm();
}