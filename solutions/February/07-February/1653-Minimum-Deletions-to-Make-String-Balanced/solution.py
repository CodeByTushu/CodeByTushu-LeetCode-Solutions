"""
Problem: LeetCode 1653 - Minimum Deletions to Make String Balanced
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def minimumDeletions(self, s: str) -> int:
        b_count = 0
        deletions = 0

        for ch in s:
            if ch == 'b':
                b_count += 1
            else:
                # Either delete this 'a' or delete all previous 'b's
                deletions = min(deletions + 1, b_count)

        return deletions
