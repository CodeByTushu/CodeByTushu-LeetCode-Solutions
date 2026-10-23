/**
 * Problem: LeetCode 3761 - Minimum Absolute Distance Between Mirror Pairs
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.HashMap;
import java.util.Map;

class Solution {
    private int reverse(int x) {
        long rev = 0;
        while (x > 0) {
            rev = rev * 10 + (x % 10);
            x /= 10;
        }
        return rev > 1_000_000_000L ? -1 : (int) rev;
    }

    public int minMirrorPairDistance(int[] nums) {
        Map<Integer, Integer> lastSeen = new HashMap<>();
        int minDistance = Integer.MAX_VALUE;

        for (int j = 0; j < nums.length; ++j) {
            int val = nums[j];
            
            // Check if nums[j] matches reverse(nums[i]) from an earlier index i
            if (lastSeen.containsKey(val)) {
                int dist = j - lastSeen.get(val);
                minDistance = Math.min(minDistance, dist);
                if (minDistance == 1) {
                    return 1; // Minimum possible distance between distinct indices
                }
            }

            // Record reverse(nums[j]) with its current index j
            int rev = reverse(val);
            if (rev != -1) {
                lastSeen.put(rev, j);
            }
        }

        return minDistance == Integer.MAX_VALUE ? -1 : minDistance;
    }
}
