#include <vector>
#include <utility>

using namespace std;

class Solution {
private:
    static constexpr int MOD = 1'000'000'007;

public:
    int zigZagArrays(int n, int l, int r) {
        int m = r - l + 1;

        vector<long long> up(m, 1);
        vector<long long> down(m, 1);

        for (int len = 2; len <= n; len++) {
            vector<long long> newUp(m, 0);
            vector<long long> newDown(m, 0);

            long long prefix = 0;
            for (int i = 0; i < m; i++) {
                newUp[i] = prefix;
                prefix = (prefix + down[i]) % MOD;
            }

            long long suffix = 0;
            for (int i = m - 1; i >= 0; i--) {
                newDown[i] = suffix;
                suffix = (suffix + up[i]) % MOD;
            }

            up = move(newUp);
            down = move(newDown);
        }

        long long ans = 0;
        for (int i = 0; i < m; i++) {
            ans = (ans + up[i] + down[i]) % MOD;
        }

        return static_cast<int>(ans);
    }
};
