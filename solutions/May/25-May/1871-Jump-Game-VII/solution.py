"""
Problem: LeetCode 1871 - Jump Game VII
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        n = len(s)
        if s[n - 1] == '1':
            return False

        dp = [False] * n
        dp[0] = True
        reachable_in_window = 0

        for i in range(1, n):
            # Element entering the sliding window: i - minJump
            if i >= minJump and dp[i - minJump]:
                reachable_in_window += 1
            # Element leaving the sliding window: i - maxJump - 1
            if i > maxJump and dp[i - maxJump - 1]:
                reachable_in_window -= 1

            if s[i] == '0' and reachable_in_window > 0:
                dp[i] = True

        return dp[n - 1]
