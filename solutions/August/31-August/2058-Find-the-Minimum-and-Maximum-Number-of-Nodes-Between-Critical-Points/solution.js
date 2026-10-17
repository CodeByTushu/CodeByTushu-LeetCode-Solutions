/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {
    const criticalPoints = [];
    let prev = head;
    let curr = head.next;
    let index = 1;

    while (curr.next !== null) {
        // Local maxima: curr > prev AND curr > next
        // Local minima: curr < prev AND curr < next
        if ((curr.val > prev.val && curr.val > curr.next.val) ||
            (curr.val < prev.val && curr.val < curr.next.val)) {
            criticalPoints.push(index);
        }
        prev = curr;
        curr = curr.next;
        index++;
    }

    // Fewer than 2 critical points
    if (criticalPoints.length < 2) {
        return [-1, -1];
    }

    let minDist = Infinity;
    const maxDist = criticalPoints[criticalPoints.length - 1] - criticalPoints[0];

    // Min distance is always between consecutive critical points
    for (let i = 1; i < criticalPoints.length; i++) {
        minDist = Math.min(minDist, criticalPoints[i] - criticalPoints[i - 1]);
    }

    return [minDist, maxDist];
};
