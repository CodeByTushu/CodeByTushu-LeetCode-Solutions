import java.util.*;

class Solution {
    private static final long MOD = 1_000_000_007L;

    public int xorAfterQueries(int[] nums, int[][] queries) {
        int n = nums.length;
        int B = Math.max(1, (int) Math.sqrt(n));

        @SuppressWarnings("unchecked")
        List<int[]>[] smallK = new ArrayList[B];

        for (int[] q : queries) {
            int l = q[0];
            int r = q[1];
            int k = q[2];
            int v = q[3];

            if (k >= B) {
                for (int idx = l; idx <= r; idx += k) {
                    nums[idx] = (int) (((long) nums[idx] * v) % MOD);
                }
            } else {
                if (smallK[k] == null) {
                    smallK[k] = new ArrayList<>();
                }
                smallK[k].add(q);
            }
        }

        for (int k = 1; k < B; k++) {
            if (smallK[k] == null) continue;

            long[] diff = new long[n + k];
            Arrays.fill(diff, 1L);

            for (int[] q : smallK[k]) {
                int l = q[0];
                int r = q[1];
                int v = q[3];

                diff[l] = (diff[l] * v) % MOD;
                int steps = (r - l) / k;
                int next = l + (steps + 1) * k;
                long inv = modInverse(v, MOD);
                diff[next] = (diff[next] * inv) % MOD;
            }

            for (int i = 0; i < n; i++) {
                if (i >= k) {
                    diff[i] = (diff[i] * diff[i - k]) % MOD;
                }
                nums[i] = (int) (((long) nums[i] * diff[i]) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }

    private long modInverse(long base, long mod) {
        return power(base, mod - 2, mod);
    }

    private long power(long base, long exp, long mod) {
        long res = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                res = (res * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return res;
    }
}
