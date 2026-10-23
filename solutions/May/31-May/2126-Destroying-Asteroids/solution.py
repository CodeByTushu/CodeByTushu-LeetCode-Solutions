"""
Problem: LeetCode 2126 - Destroying Asteroids
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def asteroidsDestroyed(self, mass: int, asteroids: List[int]) -> bool:
        asteroids.sort()
        current_mass = mass

        for asteroid in asteroids:
            if current_mass < asteroid:
                return False
            current_mass += asteroid

        return True
