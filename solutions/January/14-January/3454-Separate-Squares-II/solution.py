"""
Problem: LeetCode 3454 - Separate Squares II
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from bisect import bisect_left
from typing import List


class SegmentTree:

    def __init__(self, xs: List[int]):
        self.xs = xs
        self.n = len(xs) - 1
        self.count = [0] * (4 * self.n)
        self.length = [0] * (4 * self.n)

    def update(
        self,
        node: int,
        start: int,
        end: int,
        left: int,
        right: int,
        val: int,
    ) -> None:
        if left <= start and end <= right:
            self.count[node] += val
        else:
            mid = (start + end) // 2
            left_child = 2 * node
            right_child = 2 * node + 1
            if left <= mid:
                self.update(left_child, start, mid, left, right, val)
            if right > mid:
                self.update(right_child, mid + 1, end, left, right, val)

        if self.count[node] > 0:
            self.length[node] = self.xs[end + 1] - self.xs[start]
        else:
            if start == end:
                self.length[node] = 0
            else:
                self.length[node] = (
                    self.length[2 * node] + self.length[2 * node + 1]
                )

    def query(self) -> int:
        return self.length[1]


class Solution:

    def separateSquares(self, squares: List[List[int]]) -> float:
        events = []
        x_coords = set()

        for x, y, l in squares:
            events.append((y, 1, x, x + l))
            events.append((y + l, -1, x, x + l))
            x_coords.add(x)
            x_coords.add(x + l)

        events.sort(key=lambda e: e[0])
        xs = sorted(x_coords)
        tree = SegmentTree(xs)

        strips = []
        total_area = 0

        i = 0
        num_events = len(events)
        m = len(xs) - 2

        while i < num_events:
            curr_y = events[i][0]

            while i < num_events and events[i][0] == curr_y:
                _, event_type, x1, x2 = events[i]
                l_idx = bisect_left(xs, x1)
                r_idx = bisect_left(xs, x2) - 1
                if l_idx <= r_idx:
                    tree.update(1, 0, m, l_idx, r_idx, event_type)
                i += 1

            if i < num_events:
                next_y = events[i][0]
                width = tree.query()
                height = next_y - curr_y
                strip_area = width * height
                if strip_area > 0:
                    strips.append((curr_y, next_y, width, strip_area))
                    total_area += strip_area

        target = total_area / 2.0
        curr_area = 0.0

        for y1, y2, width, area in strips:
            if curr_area + area >= target:
                needed = target - curr_area
                return y1 + (needed / width)
            curr_area += area

        return float(events[0][0])
