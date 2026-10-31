from bisect import bisect_left, bisect_right
from typing import List

class Solution:
    def maxWalls(self, robots: List[int], distance: List[int], walls: List[int]) -> int:
        """
        Calculates the maximum number of unique walls destroyed by robots.
        
        Time Complexity: O(N log N + M log M + N log M)
        Space Complexity: O(N)
        """
        n = len(robots)
        r = sorted(zip(robots, distance), key=lambda x: x[0])
        walls.sort()

        def count_walls(low: int, high: int) -> int:
            if low > high:
                return 0
            start = bisect_left(walls, low)
            end = bisect_right(walls, high)
            return max(0, end - start)

        left_bound = [0] * n
        right_bound = [0] * n
        w_left = [0] * n
        w_right = [0] * n

        for i in range(n):
            l_limit = r[i - 1][0] + 1 if i > 0 else -float("inf")
            left_bound[i] = max(r[i][0] - r[i][1], l_limit)
            w_left[i] = count_walls(left_bound[i], r[i][0])

            r_limit = r[i + 1][0] - 1 if i < n - 1 else float("inf")
            right_bound[i] = min(r[i][0] + r[i][1], r_limit)
            w_right[i] = count_walls(r[i][0], right_bound[i])

        # dp0: robot i fires Left
        # dp1: robot i fires Right
        dp0 = w_left[0]
        dp1 = w_right[0]

        for i in range(1, n):
            if right_bound[i - 1] >= left_bound[i]:
                w_both = count_walls(r[i - 1][0], r[i][0])
            else:
                w_both = w_right[i - 1] + w_left[i]

            next_dp0 = max(dp0 + w_left[i], dp1 - w_right[i - 1] + w_both)
            next_dp1 = max(dp0, dp1) + w_right[i]

            dp0, dp1 = next_dp0, next_dp1

        return max(dp0, dp1)
