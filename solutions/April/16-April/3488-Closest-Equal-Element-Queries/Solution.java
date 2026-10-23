/**
 * Problem: LeetCode 3488 - Closest Equal Element Queries
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public List<Integer> solveQueries(int[] nums, int[] queries) {
        final int n = nums.length;
        List<Integer> ans = new ArrayList<>(queries.length);
        
        // minDist[i] stores the minimum circular distance to an identical element
        int[] minDist = new int[n];
        Arrays.fill(minDist, n);
        
        Map<Integer, Integer> lastSeen = new HashMap<>();
        
        // Traverse the circular array twice to capture all adjacent pairs & wrap-around
        for (int i = 0; i < n * 2; ++i) {
            final int index = i % n;
            final int num = nums[index];
            
            if (lastSeen.containsKey(num)) {
                final int prevIndex = lastSeen.get(num) % n;
                final int d = i - lastSeen.get(num);
                minDist[index] = Math.min(minDist[index], d);
                minDist[prevIndex] = Math.min(minDist[prevIndex], d);
            }
            lastSeen.put(num, i);
        }
        
        // Answer each query in O(1) time
        for (final int query : queries) {
            ans.add(minDist[query] == n ? -1 : minDist[query]);
        }
        
        return ans;
    }
}
