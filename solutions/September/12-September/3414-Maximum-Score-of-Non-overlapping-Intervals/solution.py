from typing import List
import bisect

class Solution:
    def maximumWeight(self, intervals: List[List[int]]) -> List[int]:
        n = len(intervals)
        # Store intervals as (l, r, weight, originalIndex)
        arr = [(intervals[i][0], intervals[i][1], intervals[i][2], i) for i in range(n)]
        
        # Sort by right endpoint, then left, then weight, then original index
        arr.sort(key=lambda x: (x[1], x[0], x[2], x[3]))
        
        r_list = [x[1] for x in arr]
        
        # pos_score[i][k] and pos_idx[i][k]
        pos_score = [[-1] * 5 for _ in range(n + 1)]
        pos_idx = [[None] * 5 for _ in range(n + 1)]
        
        def is_less(a, b):
            if b is None:
                return True
            if a is None:
                return False
            return a < b

        for i in range(n):
            l, r, w, orig_idx = arr[i]
            # Find number of non-overlapping intervals strictly before current interval's start
            p = bisect.bisect_left(r_list, l, 0, i)
            
            for k in range(1, 5):
                # Option 1: Do not pick interval i
                pos_score[i + 1][k] = pos_score[i][k]
                pos_idx[i + 1][k] = pos_idx[i][k]
                
                # Option 2: Pick interval i
                prev_s = 0 if k == 1 else pos_score[p][k - 1]
                prev_i = [] if k == 1 else pos_idx[p][k - 1]
                
                if k == 1 or prev_s >= 0:
                    new_score = prev_s + w
                    new_idx = sorted(prev_i + [orig_idx])
                    
                    if pos_score[i + 1][k] < new_score or (
                        pos_score[i + 1][k] == new_score and is_less(new_idx, pos_idx[i + 1][k])
                    ):
                        pos_score[i + 1][k] = new_score
                        pos_idx[i + 1][k] = new_idx
                        
        best_score = -1
        ans = []
        for k in range(1, 5):
            s = pos_score[n][k]
            idx = pos_idx[n][k]
            if s < 0:
                continue
            if s > best_score or (s == best_score and is_less(idx, ans)):
                best_score = s
                ans = idx
                
        return ans if ans is not None else []
