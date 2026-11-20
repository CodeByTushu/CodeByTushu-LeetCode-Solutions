/**
 * Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int maxSelectedElements(int[] nums) {
        Arrays.sort(nums);

        // dp[v] = value v pe end hone wali longest consecutive chain
        int[] dp = new int[1_000_003];
        int ans = 1;

        for (int x : nums) {
            // Pehle x+1 update karo, phir x (descending order zaroori hai)
            // taaki ek hi element dono jagah use na ho
            dp[x + 1] = dp[x] + 1;
            dp[x] = dp[x - 1] + 1;

            ans = Math.max(ans, Math.max(dp[x], dp[x + 1]));
        }

        return ans;
    }
}
