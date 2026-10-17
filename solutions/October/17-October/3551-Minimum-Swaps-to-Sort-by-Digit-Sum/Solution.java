import java.util.Arrays;

/**
 * Problem: LeetCode 3551 - Minimum Swaps to Sort by Digit Sum
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minSwaps(int[] nums) {
        int n = nums.length;
        int[] ds = new int[n];
        for (int i = 0; i < n; i++) {
            int x = nums[i], s = 0;
            while (x > 0) {
                s += x % 10;
                x /= 10;
            }
            ds[i] = s;
        }
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> {
            if (ds[a] != ds[b]) return Integer.compare(ds[a], ds[b]);
            return Integer.compare(nums[a], nums[b]);
        });
        boolean[] visited = new boolean[n];
        int swaps = 0;
        for (int i = 0; i < n; i++) {
            if (visited[i] || idx[i] == i) continue;
            int cycleLen = 0;
            int j = i;
            while (!visited[j]) {
                visited[j] = true;
                j = idx[j];
                cycleLen++;
            }
            swaps += cycleLen - 1;
        }
        return swaps;
    }
}
