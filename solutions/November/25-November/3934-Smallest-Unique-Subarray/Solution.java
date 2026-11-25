/**
 * Problem: LeetCode 3934 - Smallest Unique Subarray
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    private static final long MOD = (1L << 61) - 1;
    private long[] h, pw;
    private int[] nums;
    private int n;

    public int smallestUniqueSubarray(int[] nums) {
        this.nums = nums;
        n = nums.length;

        long base = 1_000_003L + new java.util.Random().nextInt(1_000_000);
        h = new long[n + 1];
        pw = new long[n + 1];
        pw[0] = 1;
        for (int i = 0; i < n; i++) {
            h[i + 1] = (mul(h[i], base) + nums[i]) % MOD;
            pw[i + 1] = mul(pw[i], base);
        }

        // Length n ka subarray hamesha unique hota hai, isliye answer <= n
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (hasUnique(mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    // Kya length L ka koi subarray aisa hai jo sirf ek baar aata hai?
    private boolean hasUnique(int L) {
        int m = n - L + 1;
        long[] arr = new long[m];
        for (int i = 0; i < m; i++) {
            long v = (h[i + L] - mul(h[i], pw[L])) % MOD;
            if (v < 0) v += MOD;
            arr[i] = v;
        }
        java.util.Arrays.sort(arr);

        for (int i = 0; i < m; i++) {
            boolean sameLeft = i > 0 && arr[i] == arr[i - 1];
            boolean sameRight = i < m - 1 && arr[i] == arr[i + 1];
            if (!sameLeft && !sameRight) return true;
        }
        return false;
    }

    // (a * b) mod (2^61 - 1) using fast bitwise reduction
    private static long mul(long a, long b) {
        long hi = Math.multiplyHigh(a, b);
        long lo = a * b;
        long r = (lo & MOD) + ((lo >>> 61) | (hi << 3));
        r = (r & MOD) + (r >>> 61);
        if (r >= MOD) r -= MOD;
        return r;
    }
}
