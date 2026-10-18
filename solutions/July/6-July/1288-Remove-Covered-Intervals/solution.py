from typing import List


class Solution:
    def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
        # Sort by start ascending, then by end descending
        intervals.sort(key=lambda x: (x[0], -x[1]))

        count = 0
        max_end = 0

        for _, r in intervals:
            if r > max_end:
                count += 1
                max_end = r

        return count
