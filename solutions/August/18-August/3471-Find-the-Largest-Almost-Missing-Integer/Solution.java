/**
 * Problem: LeetCode 3471 - Find the Largest Almost Missing Integer
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int largestInteger(int[] nums, int k) {
        int n = nums.length;
        int[] count = new int[51]; // values are 0..50 per constraints

        for (int start = 0; start <= n - k; start++) {
            boolean[] seen = new boolean[51];
            for (int i = start; i < start + k; i++) {
                seen[nums[i]] = true;
            }
            for (int v = 0; v <= 50; v++) {
                if (seen[v]) {
                    count[v]++;
                }
            }
        }

        int ans = -1;
        for (int v = 0; v <= 50; v++) {
            if (count[v] == 1) {
                ans = v; // ascending scan, so last match is the largest
            }
        }

        return ans;
    }
}
