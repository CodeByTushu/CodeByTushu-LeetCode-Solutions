#include <string>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 3723 - Maximize Sum of Squares of Digits
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    string maxSumOfSquares(int num, int sum) {
        if (sum > 9LL * num) return "";
        string result = "";
        result.reserve(num);
        int remaining = sum;
        for (int i = 0; i < num; i++) {
            int d = min(9, remaining);
            result.push_back('0' + d);
            remaining -= d;
        }
        return result;
    }
};
