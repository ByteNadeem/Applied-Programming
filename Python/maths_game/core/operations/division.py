class Division:
    def generate(self):
        """Generate two numbers for division."""
        return 20, 5  # You can replace with random logic later

    def calculate(self, a, b):
        """Return the result of integer division a // b."""
        if b == 0:
            return None  # Prevent ZeroDivisionError
        return a // b   # Integer division for consistency

    def symbol(self):
        """Return the symbol for division."""
        return "÷"