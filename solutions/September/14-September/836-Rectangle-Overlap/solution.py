from typing import List

class Solution:
    def isRectangleOverlap(self, rec1: List[int], rec2: List[int]) -> bool:
        return not (
            rec2[0] >= rec1[2] or   # rec2 right of rec1
            rec2[2] <= rec1[0] or   # rec2 left of rec1
            rec2[1] >= rec1[3] or   # rec2 above rec1
            rec2[3] <= rec1[1]      # rec2 below rec1
        )
