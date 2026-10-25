/**
 * Problem: LeetCode 3314 - Construct the Minimum Bitwise Array I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 * 
 * Bit Manipulation Approach (Trailing 1s Lowbit Clearing)
 * Time Complexity: O(n)
 * Space Complexity: O(1) auxiliary (excluding output array)
 */

import java.util.List;

class Solution {
    public int[] minBitwiseArray(List<Integer> nums) {
        int n = nums.size();
        int[] ans = new int[n];

        for (int i = 0; i < n; i++) {
            int p = nums.get(i);
            // Even prime (2) cannot be formed by x | (x + 1) because x | (x + 1) is always odd
            if (p == 2) {
                ans[i] = -1;
            } else {
                // Find the lowest set bit of (p + 1), which gives 2^(k) where k is the number of trailing 1s in p.
                // Shifting right by 1 gives the highest set bit in the trailing 1s block of p.
                ans[i] = p - (((p + 1) & -(p + 1)) >> 1);
            }
        }

        return ans;
    }
}
