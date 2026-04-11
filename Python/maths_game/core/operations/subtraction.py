import random

class Subtraction:
    def generate(self):
        a = random.randint(5, 20)
        b = random.randint(1, a)
        return a, b

    def calculate(self, a, b):
        return a - b

    def symbol(self):
        return "-"