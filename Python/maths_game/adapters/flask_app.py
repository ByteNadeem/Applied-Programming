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
# Paths for templates and static files
# ---------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # maths_game/
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

# ---------------------------------------------------------
# Create Flask app
# ---------------------------------------------------------
app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR
)

print("STATIC FOLDER:", app.static_folder)

# ---------------------------------------------------------
# Operation registry
# ---------------------------------------------------------
operations = {
    "addition": Addition(),
    "subtract": Subtraction(),
    "multiply": Multiplication(),
    "division": Division(),
    "modulus": Modulus()
}

# ---------------------------------------------------------
# Routes
# ---------------------------------------------------------
@app.get("/")
def index():
    """Serve the homepage."""
    return render_template("index.html")


@app.get("/question/<operation>")
def question(operation):
    """Generate a new question for the given operation."""
    if operation not in operations:
        return jsonify({"error": "Invalid operation"}), 400

    engine = GameEngine(operations[operation])
    return jsonify(engine.new_question())


@app.post("/check")
def check():
    """Check the user's answer."""
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


# ---------------------------------------------------------
# Run the Flask development server
# ---------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)