"""
Problem: LeetCode 1665 - Minimum Initial Energy to Finish Tasks
Difficulty: Hard
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def minimumEffort(self, tasks: List[List[int]]) -> int:
        # Sort tasks descending by (minimum - actual)
        # Prioritizing tasks with larger surplus energy (minimum - actual) minimizes overall starting energy
        tasks.sort(key=lambda t: t[1] - t[0], reverse=True)

        initial_energy = 0
        current_energy = 0

        for actual, minimum in tasks:
            if current_energy < minimum:
                initial_energy += minimum - current_energy
                current_energy = minimum
            current_energy -= actual

        return initial_energy
