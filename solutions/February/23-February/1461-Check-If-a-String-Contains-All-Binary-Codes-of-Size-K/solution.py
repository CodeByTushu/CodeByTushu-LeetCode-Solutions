"""
Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        target = 1 << k
        if len(s) - k + 1 < target:
            return False

        seen = bytearray(target)
        count = 0
        hash_val = 0
        mask = target - 1

        for i, ch in enumerate(s):
            hash_val = ((hash_val << 1) & mask) | (ord(ch) - 48)
            if i >= k - 1:
                if not seen[hash_val]:
                    seen[hash_val] = 1
                    count += 1
                    if count == target:
                        return True

        return count == target
