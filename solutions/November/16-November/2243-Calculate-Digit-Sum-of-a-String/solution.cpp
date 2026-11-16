/**
 * Problem: LeetCode 2243 - Calculate Digit Sum of a String
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <string>
#include <algorithm>

class Solution {
public:
    std::string digitSum(std::string s, int k) {
        while (static_cast<int>(s.length()) > k) {
            std::string next = "";
            int n = static_cast<int>(s.length());

            for (int i = 0; i < n; i += k) {
                int sum = 0;
                int end = std::min(i + k, n);

                for (int j = i; j < end; ++j) {
                    sum += s[j] - '0';
                }

                next += std::to_string(sum);
            }

            s = next;
        }

        return s;
    }
};
