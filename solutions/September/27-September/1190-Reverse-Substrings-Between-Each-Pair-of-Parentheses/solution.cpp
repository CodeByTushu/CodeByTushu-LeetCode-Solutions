#include <string>
#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 1190 - Reverse Substrings Between Each Pair of Parentheses
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    string reverseParentheses(string s) {
        vector<string> stack;
        string current = "";

        for (char c : s) {
            if (c == '(') {
                stack.push_back(move(current));
                current = "";
            } else if (c == ')') {
                reverse(current.begin(), current.end());
                current = stack.back() + current;
                stack.pop_back();
            } else {
                current += c;
            }
        }

        return current;
    }
};
