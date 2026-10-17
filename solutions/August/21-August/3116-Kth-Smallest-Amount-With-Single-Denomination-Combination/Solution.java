class Solution {
    public long findKthSmallest(int[] coins, int k) {
        int minCoin = coins[0];
        for (int c : coins) {
            minCoin = Math.min(minCoin, c);
        }

        long lo = 1, hi = (long) k * minCoin;

        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (countUpTo(mid, coins) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        return lo;
    }

    private long countUpTo(long x, int[] coins) {
        int n = coins.length;
        long count = 0;

        for (int mask = 1; mask < (1 << n); mask++) {
            long lcmVal = 1;
            boolean tooBig = false;

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    lcmVal = lcm(lcmVal, coins[i]);
                    if (lcmVal > x) {
                        tooBig = true;
                        break;
                    }
                }
            }

            if (tooBig) continue;

            long term = x / lcmVal;
            if (Integer.bitCount(mask) % 2 == 1) {
                count += term;
            } else {
                count -= term;
            }
        }

        return count;
    }

    private long gcd(long a, long b) {
        while (b != 0) {
            long t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    private long lcm(long a, long b) {
        return a / gcd(a, b) * b;
    }
}
