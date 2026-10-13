import java.util.Arrays;

/**
 * Problem: LeetCode 3727 - Maximum Alternating Sum of Squares
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public long maxAlternatingSum(int[] nums) {
        int n = nums.length;
        long[] sq = new long[n];
        for (int i = 0; i < n; i++) {
            sq[i] = (long) nums[i] * nums[i];
        }
        Arrays.sort(sq);
        int minusCount = n / 2;
        long ans = 0;
        for (int i = 0; i < n; i++) {
            if (i < minusCount) {
                ans -= sq[i];
            } else {
                ans += sq[i];
            }
        }
        return ans;
    }
}
