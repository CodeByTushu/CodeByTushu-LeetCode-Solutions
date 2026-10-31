"""
Problem: LeetCode 2075 - Decode the Slanted Ciphertext
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def decodeCiphertext(self, encodedText: str, rows: int) -> str:
        """
        Decodes a slanted transposition ciphertext matrix back into originalText.
        
        Time Complexity: O(N)
        Space Complexity: O(N)
        """
        if rows == 1 or not encodedText:
            return encodedText

        n = len(encodedText)
        cols = n // rows
        res = []

        for c in range(cols):
            for r in range(rows):
                if c + r >= cols:
                    break
                res.append(encodedText[r * cols + (c + r)])

        return "".join(res).rstrip(" ")
