async function loadQuestion(operation) {
    const response = await fetch(`/question/${operation}`);
    const data = await response.json();

    document.getElementById("operand1").textContent = data.operand1;
    document.getElementById("operand2").textContent = data.operand2;
    document.getElementById("operator").textContent = data.operator;

    window.currentOperation = operation;
}

async function checkAnswer() {
    const payload = {
        operation: window.currentOperation,
        operand1: parseInt(document.getElementById("operand1").textContent),
        operand2: parseInt(document.getElementById("operand2").textContent),
        user_answer: parseInt(document.getElementById("answer-box").value)
    };

    const response = await fetch("/check", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.is_correct) {
        alert("Correct!");
    } else {
        alert(`Incorrect. Correct answer: ${result.correct_answer}`);
    }
}