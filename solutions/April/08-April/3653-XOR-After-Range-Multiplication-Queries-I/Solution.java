/**
 * Problem: LeetCode 3653 - XOR After Range Multiplication Queries I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int xorAfterQueries(int[] nums, int[][] queries) {
        long MOD = 1_000_000_007L;

        for (int[] query : queries) {
            int l = query[0];
            int r = query[1];
            int k = query[2];
            int v = query[3];

            for (int idx = l; idx <= r; idx += k) {
                nums[idx] = (int) (((long) nums[idx] * v) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }
}
