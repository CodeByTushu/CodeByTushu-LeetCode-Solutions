from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None):
        self.val = val
        self.next = next


class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # If there is only one node
        if head is None or head.next is None:
            return None

        slow: Optional[ListNode] = head
        fast: Optional[ListNode] = head
        prev: Optional[ListNode] = None

        # Find the middle node
        while fast is not None and fast.next is not None:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        # Delete the middle node
        if prev is not None and slow is not None:
            prev.next = slow.next

        return head
