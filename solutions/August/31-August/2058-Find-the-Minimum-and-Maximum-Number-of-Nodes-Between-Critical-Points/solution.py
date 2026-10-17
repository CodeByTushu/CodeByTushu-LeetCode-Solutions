from typing import Optional, List

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def nodesBetweenCriticalPoints(self, head: Optional['ListNode']) -> List[int]:
        critical_points = []
        prev = head
        curr = head.next
        index = 1
        
        while curr.next:
            # Local maxima: curr > prev AND curr > next
            # Local minima: curr < prev AND curr < next
            if (curr.val > prev.val and curr.val > curr.next.val) or \
               (curr.val < prev.val and curr.val < curr.next.val):
                critical_points.append(index)
            prev = curr
            curr = curr.next
            index += 1
            
        if len(critical_points) < 2:
            return [-1, -1]
            
        min_dist = float('inf')
        max_dist = critical_points[-1] - critical_points[0]
        
        # Min distance is always between consecutive critical points
        for i in range(1, len(critical_points)):
            min_dist = min(min_dist, critical_points[i] - critical_points[i - 1])
            
        return [int(min_dist), max_dist]
