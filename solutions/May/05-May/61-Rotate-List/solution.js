/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Problem: LeetCode 61 - Rotate List
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) {
        return head;
    }

    // Step 1: Find length and tail
    let len = 1;
    let tail = head;
    while (tail.next !== null) {
        tail = tail.next;
        len++;
    }

    // Step 2: Normalize k
    k = k % len;
    if (k === 0) {
        return head;
    }

    // Step 3: Form circular list
    tail.next = head;

    // Step 4: Find new tail
    const stepsToNewTail = len - k;
    let newTail = tail;
    for (let i = 0; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }

    // Step 5: Disconnect circular list
    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
};
