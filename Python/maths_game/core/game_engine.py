import random

class GameEngine:
    def __init__(self, operation):
        """Store the operation object (Addition, Subtraction, etc.)."""
        self.operation = operation

    def new_question(self):
        """Generate a new question using the operation's generate() method."""
        a, b = self.operation.generate()
        return {
            "operand1": a,
            "operand2": b,
            "operator": self.operation.symbol()
        }

    def check_answer(self, a, b, user_answer):
        """Check the user's answer against the correct result."""
        correct = self.operation.calculate(a, b)

        return {
            "correct_answer": correct,
            "is_correct": user_answer == correct
        }