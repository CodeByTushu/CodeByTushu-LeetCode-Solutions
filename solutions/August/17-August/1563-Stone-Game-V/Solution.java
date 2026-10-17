import java.util.Arrays;

class Solution {
    private int[] prefixSum;
    private int[][] memo;

    public int stoneGameV(int[] stoneValue) {
        int n = stoneValue.length;
        prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
        }

        memo = new int[n][n];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }

        return solve(0, n - 1);
    }

    private int solve(int l, int r) {
        if (l == r) return 0;
        if (memo[l][r] != -1) return memo[l][r];

        int best = 0;
        for (int m = l; m < r; m++) {
            int leftSum = prefixSum[m + 1] - prefixSum[l];
            int rightSum = prefixSum[r + 1] - prefixSum[m + 1];

            int score;
            if (leftSum < rightSum) {
                score = leftSum + solve(l, m);
            } else if (leftSum > rightSum) {
                score = rightSum + solve(m + 1, r);
            } else {
                score = leftSum + Math.max(solve(l, m), solve(m + 1, r));
            }

            best = Math.max(best, score);
        }

        memo[l][r] = best;
        return best;
    }
}
