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
import java.util.ArrayList;
import java.util.List;

class Solution {
    public int[] nodesBetweenCriticalPoints(ListNode head) {
        List<Integer> criticalPoints = new ArrayList<>();
        
        ListNode prev = head;
        ListNode curr = head.next;
        int index = 1;
        
        while (curr.next != null) {
            // Local maxima: curr > prev AND curr > next
            // Local minima: curr < prev AND curr < next
            if ((curr.val > prev.val && curr.val > curr.next.val) ||
                (curr.val < prev.val && curr.val < curr.next.val)) {
                criticalPoints.add(index);
            }
            prev = curr;
            curr = curr.next;
            index++;
        }
        
        // Fewer than 2 critical points
        if (criticalPoints.size() < 2) {
            return new int[]{-1, -1};
        }
        
        int minDist = Integer.MAX_VALUE;
        int maxDist = criticalPoints.get(criticalPoints.size() - 1) 
                    - criticalPoints.get(0);
        
        // Min distance is always between consecutive critical points
        for (int i = 1; i < criticalPoints.size(); i++) {
            minDist = Math.min(minDist, 
                      criticalPoints.get(i) - criticalPoints.get(i - 1));
        }
        
        return new int[]{minDist, maxDist};
    }
}
