let currentOperation = null;
let progress = 0;
let step = 10; // 10 questions = 100%
let totalQuestions = 10;

let correctScore = 0;
let incorrectScore = 0;

// ---------------------------------------------------------
// Start a new game
// ---------------------------------------------------------
function startGame(operation) {
    currentOperation = operation;
    progress = 0;
    correctScore = 0;
    incorrectScore = 0;

    // Reset UI
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("progress-container").classList.remove("hidden");
    document.getElementById("round-complete").classList.add("hidden");

    document.getElementById("question-box").classList.remove("hidden");
    document.getElementById("scoreboard").classList.remove("hidden");

    document.getElementById("correct-score").textContent = correctScore;
    document.getElementById("incorrect-score").textContent = incorrectScore;

    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("submit-btn").disabled = false;

    loadQuestion();
}

// ---------------------------------------------------------
// Load a new question from the backend
// ---------------------------------------------------------
function loadQuestion() {
    fetch(`/question/${currentOperation}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("operand1").textContent = data.operand1;
            document.getElementById("operand2").textContent = data.operand2;
            document.getElementById("operator").textContent = data.operator;

            document.getElementById("answer-box").value = "";
            document.getElementById("answer-box").focus();

            document.getElementById("next-btn").classList.add("hidden");
            document.getElementById("submit-btn").disabled = false;
        })
        .catch(() => alert("Error loading question."));
}

// ---------------------------------------------------------
// Check the user's answer
// ---------------------------------------------------------
function checkAnswer() {
    const a = parseInt(document.getElementById("operand1").textContent);
    const b = parseInt(document.getElementById("operand2").textContent);
    const userAnswer = parseInt(document.getElementById("answer-box").value);

    if (isNaN(userAnswer)) {
        alert("Please enter a number.");
        return;
    }

    fetch("/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            operation: currentOperation,
            operand1: a,
            operand2: b,
            user_answer: userAnswer
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.is_correct) {
                correctScore++;
                document.getElementById("correct-score").textContent = correctScore;
            } else {
                incorrectScore++;
                document.getElementById("incorrect-score").textContent = incorrectScore;
                alert(`Incorrect! Correct answer: ${data.correct_answer}`);
            }

            updateProgress();

            // After answering, disable submit and show Next button
            document.getElementById("submit-btn").disabled = true;
            document.getElementById("next-btn").classList.remove("hidden");
        })
        .catch(() => alert("Something went wrong while checking your answer."));
}

// ---------------------------------------------------------
// Next question handler
// ---------------------------------------------------------
function nextQuestion() {
    if (progress >= 100) {
        return; // round already complete
    }
    loadQuestion();
}

// ---------------------------------------------------------
// Update progress bar and check for round completion
// ---------------------------------------------------------
function updateProgress() {
    progress += step;

    if (progress > 100) {
        progress = 100;
    }

    document.getElementById("progress-bar").style.width = progress + "%";

    if (progress >= 100) {
        roundComplete();
    }
}

// ---------------------------------------------------------
// Round complete logic
// ---------------------------------------------------------
function roundComplete() {
    document.getElementById("round-complete").classList.remove("hidden");

    // Confetti burst
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
    });

    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("submit-btn").disabled = true;
}

// ---------------------------------------------------------
// Allow Enter key to submit answer
// ---------------------------------------------------------
document.getElementById("answer-box").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (!document.getElementById("submit-btn").disabled) {
            checkAnswer();
        }
    }
});