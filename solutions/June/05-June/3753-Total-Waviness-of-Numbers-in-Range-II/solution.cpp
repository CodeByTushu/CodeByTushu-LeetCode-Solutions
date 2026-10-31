#include <string>
#include <vector>
#include <cstring>
#include <utility>

using namespace std;

/**
 * Problem: LeetCode 3753 - Total Waviness of Numbers in Range II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
    string num;
    long long memoCnt[20][11][11][20];
    long long memoSum[20][11][11][20];

public:
    long long totalWaviness(long long num1, long long num2) {
        return solve(num2) - solve(num1 - 1);
    }

private:
    long long solve(long long x) {
        if (x <= 0) return 0;

        num = to_string(x);
        memset(memoCnt, -1, sizeof(memoCnt));
        memset(memoSum, -1, sizeof(memoSum));

        return dfs(0, 10, 10, 0, true).second;
    }

    pair<long long, long long> dfs(int pos, int prev1, int prev2, int waviness, bool tight) {
        if (pos == (int)num.length()) {
            return {1LL, (long long)waviness};
        }

        if (!tight && memoCnt[pos][prev1][prev2][waviness] != -1) {
            return {memoCnt[pos][prev1][prev2][waviness], memoSum[pos][prev1][prev2][waviness]};
        }

        int limit = tight ? (num[pos] - '0') : 9;
        long long count = 0;
        long long sum = 0;

        for (int digit = 0; digit <= limit; ++digit) {
            bool nextTight = tight && (digit == limit);
            int nextWaviness = waviness;

            if (prev2 != 10 && prev1 != 10) {
                if ((prev1 > prev2 && prev1 > digit) ||
                    (prev1 < prev2 && prev1 < digit)) {
                    nextWaviness++;
                }
            }

            int nextPrev2 = prev1;
            int nextPrev1 = digit;

            if (prev1 == 10 && digit == 0) {
                nextPrev1 = 10;
                nextPrev2 = 10;
            }

            auto res = dfs(pos + 1, nextPrev1, nextPrev2, nextWaviness, nextTight);
            count += res.first;
            sum += res.second;
        }

        if (!tight) {
            memoCnt[pos][prev1][prev2][waviness] = count;
            memoSum[pos][prev1][prev2][waviness] = sum;
        }

        return {count, sum};
    }
};
