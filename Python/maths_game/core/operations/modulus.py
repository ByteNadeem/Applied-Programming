class Modulus:
    def generate(self):
        """Generate two numbers for modulus."""
        return 17, 5  # You can replace with random logic later

    def calculate(self, a, b):
        """Return the result of a % b."""
        if b == 0:
            return None  # Prevent ZeroDivisionError
        return a % b

    def symbol(self):
        """Return the symbol for modulus."""
        return "%"