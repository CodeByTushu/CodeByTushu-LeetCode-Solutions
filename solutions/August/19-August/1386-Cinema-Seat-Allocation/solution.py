from typing import List
from collections import defaultdict

class Solution:
    def maxNumberOfFamilies(self, n: int, reservedSeats: List[List[int]]) -> int:
        row_mask = defaultdict(int)

        for r, seat in reservedSeats:
            row_mask[r] |= (1 << seat)

        left_block = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5)
        mid_block = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7)
        right_block = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9)

        total = 0

        for mask in row_mask.values():
            if (mask & left_block) == 0 and (mask & right_block) == 0:
                total += 2
            elif (mask & left_block) == 0 or (mask & mid_block) == 0 or (mask & right_block) == 0:
                total += 1

        empty_rows = n - len(row_mask)
        total += empty_rows * 2

        return total
