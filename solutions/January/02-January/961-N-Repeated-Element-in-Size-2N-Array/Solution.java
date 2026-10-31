/**
 * Problem: LeetCode 961 - N-Repeated Element in Size 2N Array
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.HashSet;
import java.util.Set;

class Solution {
    public int repeatedNTimes(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            // Because all other elements occur strictly once,
            // the very first duplicate found is guaranteed to be our answer!
            if (seen.contains(num)) {
                return num;
            }
            seen.add(num);
        }
        return -1; // Fallback to satisfy compiler (unreachable per constraints)
    }
}
