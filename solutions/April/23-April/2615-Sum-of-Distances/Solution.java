/**
 * Problem: LeetCode 2615 - Sum of Distances
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public long[] distance(int[] nums) {
        final int n = nums.length;
        long[] result = new long[n];
        
        // Group 0-indexed positions for each unique value
        Map<Integer, List<Integer>> posMap = new HashMap<>();
        for (int i = 0; i < n; i++) {
            posMap.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
        }
        
        for (List<Integer> indices : posMap.values()) {
            final int m = indices.size();
            if (m <= 1) continue;
            
            long totalSum = 0;
            for (int idx : indices) {
                totalSum += idx;
            }
            
            long leftSum = 0;
            for (int k = 0; k < m; k++) {
                long currentIdx = indices.get(k);
                long rightSum = totalSum - leftSum - currentIdx;
                
                long leftContribution = (long) k * currentIdx - leftSum;
                long rightContribution = rightSum - (long) (m - 1 - k) * currentIdx;
                
                result[(int) currentIdx] = leftContribution + rightContribution;
                leftSum += currentIdx;
            }
        }
        
        return result;
    }
}
