/**
 * Problem: LeetCode 1404 - Number of Steps to Reduce a Number in Binary Representation to One
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    int numSteps(string s) {
        int steps = 0;
        int carry = 0;

        for (int i = (int)s.length() - 1; i > 0; i--) {
            int bit = (s[i] - '0') + carry;
            if (bit % 2 == 1) {
                steps += 2;
                carry = 1;
            } else {
                steps += 1;
            }
        }

        return steps + carry;
    }
};
