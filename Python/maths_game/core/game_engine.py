import random

class GameEngine:
    def __init__(self, operation):
        self.operation = operation

    def new_question(self):
        a = random.randint(1, 25)
        b = random.randint(1, 25)
        return {
            "operand1": a,
            "operand2": b,
            "operator": self.operation.symbol()
        }

    def check_answer(self, a, b, user_answer):
        correct = self.operation.calculate(a, b)
        return {
            "correct_answer": correct,
            "is_correct": user_answer == correct
        }