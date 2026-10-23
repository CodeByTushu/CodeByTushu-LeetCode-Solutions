/**
 * Problem: LeetCode 1340 - Jump Game V
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxJumps(int[] arr, int d) {
        int n = arr.length;
        int[] memo = new int[n];
        int maxVisited = 0;

        for (int i = 0; i < n; i++) {
            maxVisited = Math.max(maxVisited, dfs(arr, d, i, memo));
        }

        return maxVisited;
    }

    private int dfs(int[] arr, int d, int i, int[] memo) {
        if (memo[i] != 0) {
            return memo[i];
        }

        int n = arr.length;
        int res = 1;

        // Jump to the right: i + 1, ..., i + d
        for (int j = i + 1; j <= Math.min(i + d, n - 1); j++) {
            if (arr[j] >= arr[i]) {
                break; // Blocked by equal or taller bar
            }
            res = Math.max(res, 1 + dfs(arr, d, j, memo));
        }

        // Jump to the left: i - 1, ..., i - d
        for (int j = i - 1; j >= Math.max(i - d, 0); j--) {
            if (arr[j] >= arr[i]) {
                break; // Blocked by equal or taller bar
            }
            res = Math.max(res, 1 + dfs(arr, d, j, memo));
        }

        return memo[i] = res;
    }
}
