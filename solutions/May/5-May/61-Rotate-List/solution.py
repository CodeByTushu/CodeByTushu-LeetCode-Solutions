"""
Problem: LeetCode 61 - Rotate List
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0:
            return head

        # Step 1: Find length and tail
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1

        # Step 2: Normalize k
        k %= length
        if k == 0:
            return head

        # Step 3: Make it circular
        tail.next = head

        # Step 4: Find new tail (length - k steps from tail)
        steps_to_new_tail = length - k
        new_tail = tail
        for _ in range(steps_to_new_tail):
            new_tail = new_tail.next

        # Step 5: Disconnect and return new head
        new_head = new_tail.next
        new_tail.next = None

        return new_head
