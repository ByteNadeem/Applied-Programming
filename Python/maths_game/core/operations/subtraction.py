class Subtraction:
    def generate(self):
        """Generate two numbers for subtraction (a - b, non-negative)."""
        a = 8
        b = 3
        return a, b

    def calculate(self, a, b):
        """Return the result of a - b."""
        return a - b

    def symbol(self):
        """Return the symbol for subtraction."""
        return "-"