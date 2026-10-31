/**
 * Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    bool checkOnesSegment(string s) {
        // Since s has no leading zeros (s[0] == '1'),
        // more than one segment of ones exists if and only if "01" is present.
        return s.find("01") == string::npos;
    }
};
