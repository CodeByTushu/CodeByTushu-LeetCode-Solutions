#include <string>

using namespace std;

/**
 * Problem: LeetCode 796 - Rotate String
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool rotateString(string s, string goal) {
        return s.length() == goal.length() && (s + s).find(goal) != string::npos;
    }
};
