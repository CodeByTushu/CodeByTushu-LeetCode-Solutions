"""
Problem: LeetCode 3464 - Maximize the Distance Between Points on a Square
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from typing import List
from bisect import bisect_left


class Solution:
    def maxDistance(self, side: int, points: List[List[int]], k: int) -> int:
        n = len(points)
        arr = [0] * n

        # Convert boundary points into 1D perimeter distance
        for i, (x, y) in enumerate(points):
            if x == 0:
                arr[i] = y
            elif y == side:
                arr[i] = side + x
            elif x == side:
                arr[i] = 3 * side - y
            else:
                arr[i] = 4 * side - x

        arr.sort()

        perimeter = 4 * side
        arr_ext = arr + [val + perimeter for val in arr]

        def can_place(d: int) -> bool:
            for i in range(n):
                curr = arr[i]
                count = 1
                idx = i

                for _ in range(k - 1):
                    target = curr + d
                    found = bisect_left(arr_ext, target, idx + 1, i + n)
                    if found >= i + n:
                        break
                    curr = arr_ext[found]
                    idx = found
                    count += 1

                if count == k and (arr[i] + perimeter - curr) >= d:
                    return True
            return False

        left, right = 1, side
        ans = 0

        while left <= right:
            mid = (left + right) // 2
            if can_place(mid):
                ans = mid
                left = mid + 1
            else:
                right = mid - 1

        return ans
