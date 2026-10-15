class Solution {
    public long[] resultArray(int[] nums, int k) {
        int n = nums.length;
        long[] result = new long[k];
        long[] dp = new long[k];
        for (int r = 0; r < n; r++) {
            long[] newDp = new long[k];
            int valMod = nums[r] % k;
            for (int rem = 0; rem < k; rem++) {
                if (dp[rem] > 0) {
                    int newRem = (int) ((long) rem * valMod % k);
                    newDp[newRem] += dp[rem];
                }
            }
            newDp[valMod]++;
            for (int x = 0; x < k; x++) {
                result[x] += newDp[x];
            }
            dp = newDp;
        }
        return result;
    }
}
