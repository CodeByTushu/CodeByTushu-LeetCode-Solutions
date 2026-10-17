import java.util.Arrays;

/**
 * Problem: LeetCode 2916 - Subarrays Distinct Element Sum of Squares II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    private static final long MOD = 1_000_000_007L;
    private long[] sum;
    private long[] sq;
    private long[] lazy;

    public int sumCounts(int[] nums) {
        int n = nums.length;
        sum = new long[4 * n];
        sq = new long[4 * n];
        lazy = new long[4 * n];

        int[] last = new int[100001];
        Arrays.fill(last, -1);

        long ans = 0;
        for (int j = 0; j < n; j++) {
            int x = nums[j];
            update(1, 0, n - 1, last[x] + 1, j, 1);
            last[x] = j;
            ans = (ans + sq[1]) % MOD;
        }

        return (int) ans;
    }

    private void apply(int node, int len, long v) {
        sq[node] = (sq[node] + 2 * v % MOD * sum[node] % MOD + v * v % MOD * len) % MOD;
        sum[node] = (sum[node] + v * len) % MOD;
        lazy[node] = (lazy[node] + v) % MOD;
    }

    private void push(int node, int l, int r) {
        if (lazy[node] != 0) {
            int mid = (l + r) / 2;
            apply(node * 2, mid - l + 1, lazy[node]);
            apply(node * 2 + 1, r - mid, lazy[node]);
            lazy[node] = 0;
        }
    }

    private void update(int node, int l, int r, int ql, int qr, long v) {
        if (qr < l || r < ql) return;
        if (ql <= l && r <= qr) {
            apply(node, r - l + 1, v);
            return;
        }
        push(node, l, r);
        int mid = (l + r) / 2;
        update(node * 2, l, mid, ql, qr, v);
        update(node * 2 + 1, mid + 1, r, ql, qr, v);
        sum[node] = (sum[node * 2] + sum[node * 2 + 1]) % MOD;
        sq[node] = (sq[node * 2] + sq[node * 2 + 1]) % MOD;
    }
}
