/**
 * Problem: LeetCode 2747 - Count Zero Request Servers
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public int[] countServers(int n, int[][] logs, int x, int[] queries) {
        // Sort logs by timestamp ascending
        Arrays.sort(logs, (a, b) -> Integer.compare(a[1], b[1]));

        int qn = queries.length;
        Integer[] order = new Integer[qn];
        for (int i = 0; i < qn; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> Integer.compare(queries[a], queries[b]));

        int[] cnt = new int[n + 1];
        int[] ans = new int[qn];
        int active = 0;
        int l = 0, r = 0;
        int m = logs.length;

        for (int idx : order) {
            int q = queries[idx];

            // Ingest logs with timestamp <= q
            while (r < m && logs[r][1] <= q) {
                if (cnt[logs[r][0]]++ == 0) active++;
                r++;
            }

            // Evict expired logs with timestamp < q - x
            while (l < r && logs[l][1] < q - x) {
                if (--cnt[logs[l][0]] == 0) active--;
                l++;
            }

            ans[idx] = n - active;
        }

        return ans;
    }
}
