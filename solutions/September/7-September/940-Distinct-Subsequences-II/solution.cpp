#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    int distinctSubseqII(string s) {
        long long MOD = 1'000'000'007;
        vector<long long> dp(26, 0);

        for (char ch : s) {
            int c = ch - 'a';
            long long total = 1;
            for (int i = 0; i < 26; i++) {
                total = (total + dp[i]) % MOD;
            }
            dp[c] = total;
        }

        long long ans = 0;
        for (int i = 0; i < 26; i++) {
            ans = (ans + dp[i]) % MOD;
        }

        return static_cast<int>(ans);
    }
};
