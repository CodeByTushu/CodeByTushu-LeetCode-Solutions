import java.util.*;

class SparseTableRMQ {
    int n;
    int maxLog;
    int[][] fMax;
    int[][] fMin;
    int[] lg;

    public SparseTableRMQ(int[] data) {
        n = data.length;
        maxLog = 32 - Integer.numberOfLeadingZeros(n) + 1;

        fMax = new int[n][maxLog];
        fMin = new int[n][maxLog];
        lg = new int[n + 1];

        for (int i = 2; i <= n; i++) {
            lg[i] = lg[i >> 1] + 1;
        }

        for (int i = 0; i < n; i++) {
            fMax[i][0] = data[i];
            fMin[i][0] = data[i];
        }

        for (int j = 1; j < maxLog; j++) {
            for (int i = 0; i <= n - (1 << j); i++) {
                fMax[i][j] = Math.max(
                        fMax[i][j - 1],
                        fMax[i + (1 << (j - 1))][j - 1]);

                fMin[i][j] = Math.min(
                        fMin[i][j - 1],
                        fMin[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    public int queryMax(int l, int r) {
        int k = lg[r - l + 1];
        return Math.max(
                fMax[l][k],
                fMax[r - (1 << k) + 1][k]);
    }

    public int queryMin(int l, int r) {
        int k = lg[r - l + 1];
        return Math.min(
                fMin[l][k],
                fMin[r - (1 << k) + 1][k]);
    }
}

/**
 * Problem: LeetCode 3691 - Maximum Total Subarray Value II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {

    public long maxTotalValue(int[] nums, int k) {

        int n = nums.length;

        SparseTableRMQ st = new SparseTableRMQ(nums);

        PriorityQueue<long[]> pq =
                new PriorityQueue<>((a, b) -> Long.compare(b[0], a[0]));

        for (int l = 0; l < n; l++) {
            long val =
                    (long) st.queryMax(l, n - 1)
                            - st.queryMin(l, n - 1);

            pq.offer(new long[]{val, l, n - 1});
        }

        long ans = 0;

        for (int i = 0; i < k; i++) {

            long[] cur = pq.poll();

            long val = cur[0];
            int l = (int) cur[1];
            int r = (int) cur[2];

            ans += val;

            if (r > l) {

                long nextVal =
                        (long) st.queryMax(l, r - 1)
                                - st.queryMin(l, r - 1);

                pq.offer(new long[]{nextVal, l, r - 1});
            }
        }

        return ans;
    }
}
