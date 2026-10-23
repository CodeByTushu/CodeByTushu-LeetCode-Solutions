#include <string>

/**
 * Problem: LeetCode 1927 - Sum Game
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool sumGame(std::string num) {
        int n = num.size();
        int half = n / 2;

        int sum1 = 0, sum2 = 0;
        int q1 = 0, q2 = 0;

        for (int i = 0; i < half; ++i) {
            if (num[i] == '?') {
                q1++;
            } else {
                sum1 += num[i] - '0';
            }
        }

        for (int i = half; i < n; ++i) {
            if (num[i] == '?') {
                q2++;
            } else {
                sum2 += num[i] - '0';
            }
        }

        if ((q1 + q2) % 2 == 1) {
            return true;
        }

        int diff = sum1 - sum2;
        int finalDiff = diff + 9 * (q1 - q2) / 2;

        return finalDiff != 0;
    }
};
