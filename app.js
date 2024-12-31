let vocab = [];
let currentIndex = 0;
let showingAnswer = false;

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                vocab = JSON.parse(e.target.result);
                vocab = shuffleArray(vocab);
                currentIndex = 0;
                showQuestion();
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
});

document.getElementById('card').addEventListener('click', function() {
    if (vocab.length === 0) return;

    if (showingAnswer) {
        currentIndex = (currentIndex + 1) % vocab.length;
        showQuestion();
    } else {
        showAnswer();
    }
});

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