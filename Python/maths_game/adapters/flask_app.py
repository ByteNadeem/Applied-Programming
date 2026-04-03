from flask import Flask, request, jsonify
from maths_game.core.game_engine import GameEngine
from maths_game.core.operations.addition import Addition
from maths_game.core.operations.subtraction import Subtraction
from maths_game.core.operations.multiplication import Multiplication
from maths_game.core.operations.division import Division
from maths_game.core.operations.modulus import Modulus

app = Flask(__name__)

operations = {
    "addition": Addition(),
    "subtract": Subtraction(),
    "multiply": Multiplication(),
    "division": Division(),
    "modulus": Modulus()
}

@app.get("/question/<operation>")
def question(operation):
    engine = GameEngine(operations[operation])
    return jsonify(engine.new_question())

@app.post("/check")
def check():
    data = request.json
    engine = GameEngine(operations[data["operation"]])
    return jsonify(engine.check_answer(
        data["operand1"],
        data["operand2"],
        data["user_answer"]
    ))