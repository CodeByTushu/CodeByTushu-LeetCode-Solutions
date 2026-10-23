#include <string>

/**
 * Problem: LeetCode 3498 - Reverse Degree of a String
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int reverseDegree(std::string s) {
        int result = 0;
        for (int i = 0; i < (int)s.length(); i++) {
            int reversedAlphabetPos = 26 - (s[i] - 'a');
            int stringPos = i + 1;
            result += reversedAlphabetPos * stringPos;
        }
        return result;
    }
};
