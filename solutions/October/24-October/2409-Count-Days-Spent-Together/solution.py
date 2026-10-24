"""
Problem: LeetCode 2409 - Count Days Spent Together
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def countDaysTogether(self, arriveAlice: str, leaveAlice: str, arriveBob: str, leaveBob: str) -> int:
        days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        prefix = [0] * 13
        for m in range(1, 13):
            prefix[m] = prefix[m - 1] + days[m - 1]

        def to_day(date: str) -> int:
            month = int(date[:2])
            day = int(date[3:5])
            return prefix[month - 1] + day

        a_a = to_day(arriveAlice)
        l_a = to_day(leaveAlice)
        a_b = to_day(arriveBob)
        l_b = to_day(leaveBob)

        start = max(a_a, a_b)
        end = min(l_a, l_b)
        return max(0, end - start + 1)
