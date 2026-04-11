import random

class Multiplication:
    def generate(self):
        return random.randint(1, 12), random.randint(1, 12)

    def calculate(self, a, b):
        return a * b

    def symbol(self):
        return "×"