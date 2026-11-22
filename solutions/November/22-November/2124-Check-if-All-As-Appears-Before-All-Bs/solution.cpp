/**
 * Problem: LeetCode 2124 - Check if All A's Appears Before All B's
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    bool checkString(string s) {
        // Agar string me "ba" substring nahi milti (find returns npos), toh true
        return s.find("ba") == string::npos;
    }
};
