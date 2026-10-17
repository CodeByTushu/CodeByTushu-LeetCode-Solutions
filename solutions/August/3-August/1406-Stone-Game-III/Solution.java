class Solution {
    public String stoneGameIII(int[] stoneValue) {
        int n = stoneValue.length;
        int[] dp = new int[n + 1];
        // dp[i] = best score difference (current player - other player) starting from index i
        
        for (int i = n - 1; i >= 0; i--) {
            int take = 0;
            int best = Integer.MIN_VALUE;
            for (int k = 0; k < 3 && i + k < n; k++) {
                take += stoneValue[i + k];
                best = Math.max(best, take - dp[i + k + 1]);
            }
            dp[i] = best;
        }
        
        if (dp[0] > 0) return "Alice";
        else if (dp[0] < 0) return "Bob";
        else return "Tie";
    }
}
