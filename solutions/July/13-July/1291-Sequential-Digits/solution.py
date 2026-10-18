from collections import deque
from typing import List

class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        ans = []
        queue = deque(range(1, 10))

        while queue:
            num = queue.popleft()
            if low <= num <= high:
                ans.append(num)
            if num > high:
                continue

            last_digit = num % 10
            if last_digit < 9:
                queue.append(num * 10 + last_digit + 1)

        ans.sort()
        return ans
