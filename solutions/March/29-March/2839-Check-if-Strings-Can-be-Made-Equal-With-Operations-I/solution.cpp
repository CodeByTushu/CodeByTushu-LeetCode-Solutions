/**
 * Problem: LeetCode 2839 - Check if Strings Can be Made Equal With Operations I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    bool canBeEqual(string s1, string s2) {
        bool evenMatch = (s1[0] == s2[0] && s1[2] == s2[2]) ||
                         (s1[0] == s2[2] && s1[2] == s2[0]);

        bool oddMatch = (s1[1] == s2[1] && s1[3] == s2[3]) ||
                        (s1[1] == s2[3] && s1[3] == s2[1]);

        return evenMatch && oddMatch;
    }
};
