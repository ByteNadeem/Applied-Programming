# ---------------------------------------------------------
# Diagnostic print to confirm Flask is loading THIS file
# ---------------------------------------------------------
print(">>> FLASK APP LOADED <<<")

import os
from flask import Flask, request, jsonify, render_template

from ..core.game_engine import GameEngine
from ..core.operations.addition import Addition
from ..core.operations.subtraction import Subtraction
from ..core.operations.multiplication import Multiplication
from ..core.operations.division import Division
from ..core.operations.modulus import Modulus

# ---------------------------------------------------------
# Locate the templates folder one level above /adapters/
# ---------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # maths_game/
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")

# ---------------------------------------------------------
# Create Flask app and print static folder path
# ---------------------------------------------------------
STATIC_DIR = os.path.join(BASE_DIR, "static")

app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR
)

print("STATIC FOLDER:", app.static_folder)

# ---------------------------------------------------------
# Map operation names to classes
# ---------------------------------------------------------
operations = {
    "addition": Addition(),
    "subtract": Subtraction(),
    "multiply": Multiplication(),
    "division": Division(),
    "modulus": Modulus()
}

# ---------------------------------------------------------
# 1. Serve the homepage
# ---------------------------------------------------------
@app.get("/")
def index():
    return render_template("index.html")

# ---------------------------------------------------------
# 2. Get a new question
# ---------------------------------------------------------
@app.get("/question/<operation>")
def question(operation):
    if operation not in operations:
        return jsonify({"error": "Invalid operation"}), 400

    engine = GameEngine(operations[operation])
    return jsonify(engine.new_question())

# ---------------------------------------------------------
# 3. Check the user's answer
# ---------------------------------------------------------
@app.post("/check")
def check():
    data = request.json

    operation = data.get("operation")
    if operation not in operations:
        return jsonify({"error": "Invalid operation"}), 400

    engine = GameEngine(operations[operation])

    return jsonify(engine.check_answer(
        data["operand1"],
        data["operand2"],
        data["user_answer"]
    ))