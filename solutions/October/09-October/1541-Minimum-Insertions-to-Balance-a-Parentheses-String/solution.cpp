#include <string>

using namespace std;

/**
 * Problem: LeetCode 1541 - Minimum Insertions to Balance a Parentheses String
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int minInsertions(string s) {
        int open = 0; // unmatched '('
        int ans = 0;  // insertions
        int i = 0, n = s.length();

        while (i < n) {
            if (s[i] == '(') {
                open++;
                i++;
            } else {
                // Need two consecutive ')'
                if (i + 1 < n && s[i + 1] == ')') {
                    i += 2;
                } else {
                    ans++; // insert missing ')'
                    i++;
                }

                if (open > 0) {
                    open--;
                } else {
                    ans++; // insert missing '('
                }
            }
        }

        return ans + open * 2;
    }
};
