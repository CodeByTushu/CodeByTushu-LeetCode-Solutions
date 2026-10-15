from typing import List

class Solution:
    def largestOverlap(self, img1: List[List[int]], img2: List[List[int]]) -> int:
        n = len(img1)
        max_overlap = 0

        def count_overlap(dx: int, dy: int) -> int:
            count = 0
            for r in range(n):
                for c in range(n):
                    nr = r + dy
                    nc = c + dx
                    if 0 <= nr < n and 0 <= nc < n:
                        if img1[r][c] == 1 and img2[nr][nc] == 1:
                            count += 1
            return count

        for dy in range(-(n - 1), n):
            for dx in range(-(n - 1), n):
                max_overlap = max(max_overlap, count_overlap(dx, dy))

        return max_overlap
