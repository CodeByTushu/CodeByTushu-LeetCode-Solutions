class Solution {
    public int stoneGameVIII(int[] stones) {
        int n = stones.length;
        long[] prefix = new long[n];
        prefix[0] = stones[0];
        for (int i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] + stones[i];
        }

        // dp represents the best score difference the current player can achieve
        // starting from the state where the "cut" is at index i (i.e., first i+1 stones merged)
        long dp = prefix[n - 1];
        for (int i = n - 2; i >= 1; i--) {
            dp = Math.max(dp, prefix[i] - dp);
        }

        return (int) dp;
    }
}
