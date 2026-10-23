/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
/**
 * Problem: LeetCode 61 - Rotate List
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        // Step 1: Find the length and tail of the linked list
        int len = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            len++;
        }

        // Step 2: Normalize k
        k = k % len;
        if (k == 0) {
            return head;
        }

        // Step 3: Connect tail to head to form a circular list
        tail.next = head;

        // Step 4: Find the new tail at (len - k) steps from tail
        int stepsToNewTail = len - k;
        ListNode newTail = tail;
        for (int i = 0; i < stepsToNewTail; i++) {
            newTail = newTail.next;
        }

        // Step 5: Disconnect and set new head
        ListNode newHead = newTail.next;
        newTail.next = null;

        return newHead;
    }
}
