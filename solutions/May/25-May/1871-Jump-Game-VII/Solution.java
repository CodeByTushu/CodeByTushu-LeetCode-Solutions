/**
 * Problem: LeetCode 1871 - Jump Game VII
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) == '1') {
            return false;
        }

        boolean[] dp = new boolean[n];
        dp[0] = true;
        int reachableInWindow = 0;

        for (int i = 1; i < n; i++) {
            // Add (i - minJump) to sliding window
            if (i >= minJump && dp[i - minJump]) {
                reachableInWindow++;
            }
            // Remove (i - maxJump - 1) from sliding window
            if (i > maxJump && dp[i - maxJump - 1]) {
                reachableInWindow--;
            }

            // Current index is reachable if within valid jump range and character is '0'
            if (s.charAt(i) == '0' && reachableInWindow > 0) {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
}
