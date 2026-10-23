/**
 * Problem: LeetCode 1871 - Jump Game VII
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    bool canReach(string s, int minJump, int maxJump) {
        int n = s.length();
        if (s[n - 1] == '1') {
            return false;
        }

        vector<bool> dp(n, false);
        dp[0] = true;
        int reachableInWindow = 0;

        for (int i = 1; i < n; ++i) {
            if (i >= minJump && dp[i - minJump]) {
                reachableInWindow++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                reachableInWindow--;
            }

            if (s[i] == '0' && reachableInWindow > 0) {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
};
