#include <string>

using namespace std;

/**
 * Problem: LeetCode 3754 - Concatenate Non-Zero Digits and Multiply by Sum I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    long long sumAndMultiply(int n) {
        if (n == 0) return 0;

        long long x = 0;
        long long sum = 0;

        string s = to_string(n);

        for (char ch : s) {
            if (ch != '0') {
                int digit = ch - '0';
                x = x * 10 + digit;
                sum += digit;
            }
        }

        return x * sum;
    }
};
