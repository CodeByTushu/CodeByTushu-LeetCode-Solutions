/**
 * Problem: LeetCode 3871 - Count Commas in Range II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    long long countCommas(long long n) {
        long long result = 0;
        long long threshold = 1000LL;

        while (threshold <= n) {
            result += (n - threshold + 1);
            if (threshold > n / 1000LL) {
                break;
            }
            threshold *= 1000LL;
        }

        return result;
    }
};
