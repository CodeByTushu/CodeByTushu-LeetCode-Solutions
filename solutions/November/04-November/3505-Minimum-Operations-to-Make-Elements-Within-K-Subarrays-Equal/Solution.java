/**
 * Problem: LeetCode 3505 - Minimum Operations to Make Elements Within K Subarrays Equal
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    int m;
    long[] bc, bs;

    private void upd(int i, int c, long v) {
        for (; i <= m; i += i & -i) {
            bc[i] += c;
            bs[i] += v;
        }
    }

    public long minOperations(int[] nums, int x, int k) {
        int n = nums.length;

        // Coordinate compression
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int u = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || sorted[i] != sorted[i - 1]) sorted[u++] = sorted[i];
        }
        int[] vals = Arrays.copyOf(sorted, u);
        m = u;
        bc = new long[m + 1];
        bs = new long[m + 1];

        int[] idx = new int[n];
        for (int i = 0; i < n; i++) {
            idx[i] = Arrays.binarySearch(vals, nums[i]) + 1; // 1-indexed
        }

        int LOG = Integer.highestOneBit(m);
        long[] cost = new long[n - x + 1];
        long total = 0;

        for (int i = 0; i < n; i++) {
            upd(idx[i], 1, nums[i]);
            total += nums[i];

            if (i >= x) {
                upd(idx[i - x], -1, -nums[i - x]);
                total -= nums[i - x];
            }

            if (i >= x - 1) {
                int kth = x / 2 + 1;
                int pos = 0;
                long accSum = 0;
                int rem = kth;
                for (int pw = LOG; pw > 0; pw >>= 1) {
                    int np = pos + pw;
                    if (np <= m && bc[np] < rem) {
                        pos = np;
                        rem -= (int) bc[np];
                        accSum += bs[np];
                    }
                }
                long median = vals[pos]; // pos+1 in 1-indexed
                long sumLow = accSum + (long) rem * median;
                long sumUp = total - sumLow;

                cost[i - x + 1] = median * kth - sumLow + sumUp - median * (x - kth);
            }
        }

        long INF = Long.MAX_VALUE / 4;
        long[] prev = new long[n + 1]; // j = 0: cost 0
        for (int j = 1; j <= k; j++) {
            long[] cur = new long[n + 1];
            cur[0] = INF;
            for (int i = 1; i <= n; i++) {
                cur[i] = cur[i - 1];
                if (i >= x && prev[i - x] < INF) {
                    cur[i] = Math.min(cur[i], prev[i - x] + cost[i - x]);
                }
            }
            prev = cur;
        }

        return prev[n];
    }
}
