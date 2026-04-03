from abc import ABC, abstractmethod

class Operation(ABC):
    """Interface for all maths operations."""

    @abstractmethod
    def calculate(self, a: int, b: int) -> int:
        pass

    @abstractmethod
    def symbol(self) -> str:
        pass