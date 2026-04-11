import random

class Modulus:
    def generate(self):
        b = random.randint(1, 10)
        a = random.randint(1, 50)
        return a, b

    def calculate(self, a, b):
        return a % b

    def symbol(self):
        return "%"