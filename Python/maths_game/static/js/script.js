let currentOperation = null;
let progress = 0;
let step = 10; // 10 questions = 100%
let totalQuestions = 10;

// ---------------------------------------------------------
// Start a new game
// ---------------------------------------------------------
function startGame(operation) {
    currentOperation = operation;
    progress = 0;

    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("progress-container").classList.remove("hidden");
    document.getElementById("round-complete").classList.add("hidden");

    document.getElementById("question-box").classList.remove("hidden");

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
                updateProgress();
            } else {
                alert(`Incorrect! Correct answer: ${data.correct_answer}`);
            }
        })
        .catch(() => alert("Something went wrong while checking your answer."));
}

// ---------------------------------------------------------
// Update progress bar and check for round completion
// ---------------------------------------------------------
function updateProgress() {
    progress += step;

    document.getElementById("progress-bar").style.width = progress + "%";

    if (progress >= 100) {
        roundComplete();
    } else {
        loadQuestion();
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
}

// ---------------------------------------------------------
// Allow Enter key to submit answer
// ---------------------------------------------------------
document.getElementById("answer-box").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});