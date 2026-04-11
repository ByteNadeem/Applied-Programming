import random

class Division:
    def generate(self):
        b = random.randint(1, 10)
        a = b * random.randint(1, 10)
        return a, b

    def calculate(self, a, b):
        return a // b

    def symbol(self):
        return "÷"