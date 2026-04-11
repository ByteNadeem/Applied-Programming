// ------------------------------
// Global State
// ------------------------------
let correctScore = 0;
let incorrectScore = 0;
let progress = 0;
const progressStep = 10;
window.currentOperation = null;

// ------------------------------
// Confetti Launcher
// ------------------------------
function launchConfetti() {
    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// ------------------------------
// Load a new question
// ------------------------------
async function loadQuestion(operation) {
    try {
        // Reset progress + message when switching operation
        if (window.currentOperation !== operation) {
            progress = 0;
            document.getElementById("progress-bar").style.width = "0%";
            document.getElementById("round-complete-message").style.display = "none";
        }

        const response = await fetch(`/question/${operation}`);
        const data = await response.json();

        document.getElementById("operand1").textContent = data.operand1;
        document.getElementById("operand2").textContent = data.operand2;
        document.getElementById("operator").textContent = data.operator;

        window.currentOperation = operation;

        const answerBox = document.getElementById("answer-box");
        answerBox.value = "";
        answerBox.focus();

    } catch (error) {
        console.error("Error loading question:", error);
        alert("Could not load question. Please try again.");
    }
}

// ------------------------------
// Check the user's answer
// ------------------------------
async function checkAnswer() {

    if (!window.currentOperation) {
        alert("Please choose an operation first.");
        return;
    }

    const answerBox = document.getElementById("answer-box");
    if (answerBox.value.trim() === "") {
        alert("Please enter an answer before submitting.");
        return;
    }

    const payload = {
        operation: window.currentOperation,
        operand1: parseInt(document.getElementById("operand1").textContent),
        operand2: parseInt(document.getElementById("operand2").textContent),
        user_answer: parseInt(answerBox.value)
    };

    try {
        const response = await fetch("/check", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const questionArea = document.querySelector(".question-area");

        if (result.is_correct) {
            questionArea.classList.add("correct-flash");
            setTimeout(() => questionArea.classList.remove("correct-flash"), 400);

            correctScore++;
            document.getElementById("score").textContent = correctScore;

        } else {
            questionArea.classList.add("shake");
            setTimeout(() => questionArea.classList.remove("shake"), 400);

            incorrectScore++;
            document.getElementById("incorrect").textContent = incorrectScore;
        }

        // Progress Bar Update
        progress = Math.min(progress + progressStep, 100);
        document.getElementById("progress-bar").style.width = progress + "%";

        // Round Complete
        if (progress === 100) {
            launchConfetti();

            const msg = document.getElementById("round-complete-message");
            msg.textContent = "🎉 Round Complete! Great job! 🎉";
            msg.style.display = "block";
        }

    } catch (error) {
        console.error("Error checking answer:", error);
        alert("Something went wrong while checking your answer.");
    }
}

// ------------------------------
// Next Question
// ------------------------------
function nextQuestion() {
    if (!window.currentOperation) {
        alert("Choose an operation first.");
        return;
    }
    loadQuestion(window.currentOperation);
}

// ------------------------------
// Enter Key Support
// ------------------------------
document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});