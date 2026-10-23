"""
Problem: LeetCode 3635 - Earliest Finish Time for Land and Water Rides II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

import bisect

class Solution:
    def earliestFinishTime(
        self,
        landStartTime: list[int],
        landDuration: list[int],
        waterStartTime: list[int],
        waterDuration: list[int],
    ) -> int:
        def solve(
            firstStart: list[int],
            firstDur: list[int],
            secondStart: list[int],
            secondDur: list[int],
        ) -> int:
            m = len(secondStart)
            rides = sorted(zip(secondStart, secondDur), key=lambda x: x[0])
            starts = [r[0] for r in rides]

            prefixMinDur = [0] * m
            prefixMinDur[0] = rides[0][1]
            for i in range(1, m):
                prefixMinDur[i] = min(prefixMinDur[i - 1], rides[i][1])

            suffixMinOpenFinish = [0] * m
            suffixMinOpenFinish[m - 1] = rides[m - 1][0] + rides[m - 1][1]
            for i in range(m - 2, -1, -1):
                suffixMinOpenFinish[i] = min(
                    suffixMinOpenFinish[i + 1],
                    rides[i][0] + rides[i][1],
                )

            ans = float('inf')
            for fs, fd in zip(firstStart, firstDur):
                t = fs + fd
                idx = bisect.bisect_left(starts, t)
                best = float('inf')

                # rides with start >= t
                if idx < m:
                    best = min(best, suffixMinOpenFinish[idx])

                # rides with start < t
                if idx > 0:
                    best = min(best, t + prefixMinDur[idx - 1])

                ans = min(ans, best)

            return int(ans)

        ans1 = solve(landStartTime, landDuration, waterStartTime, waterDuration)
        ans2 = solve(waterStartTime, waterDuration, landStartTime, landDuration)
        return min(ans1, ans2)
