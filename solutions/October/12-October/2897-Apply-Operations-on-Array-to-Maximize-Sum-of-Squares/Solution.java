import java.util.List;

/**
 * Problem: LeetCode 2897 - Apply Operations on Array to Maximize Sum of Squares
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxSum(List<Integer> nums, int k) {
        final int MOD = 1_000_000_007;
        int[] cnt = new int[30];
        for (int num : nums) {
            for (int b = 0; b < 30; b++) {
                if (((num >> b) & 1) == 1) cnt[b]++;
            }
        }
        long ans = 0;
        for (int i = 0; i < k; i++) {
            long cur = 0;
            for (int b = 0; b < 30; b++) {
                if (cnt[b] > 0) {
                    cur |= (1L << b);
                    cnt[b]--;
                }
            }
            ans = (ans + (cur % MOD) * (cur % MOD)) % MOD;
        }
        return (int) ans;
    }
}
