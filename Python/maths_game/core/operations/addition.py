import random

class Addition:
    def generate(self):
        return random.randint(1, 20), random.randint(1, 20)

    def calculate(self, a, b):
        return a + b

    def symbol(self):
        return "+"