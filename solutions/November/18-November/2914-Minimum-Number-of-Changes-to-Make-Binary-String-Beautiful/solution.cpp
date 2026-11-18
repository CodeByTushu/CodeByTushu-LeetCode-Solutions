/**
 * Problem: LeetCode 2914 - Minimum Number of Changes to Make Binary String Beautiful
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <string>

using namespace std;

class Solution {
public:
    int minChanges(string s) {
        int changes = 0;

        for (int i = 0; i < (int)s.length(); i += 2) {
            if (s[i] != s[i + 1]) {
                changes++;
            }
        }

        return changes;
    }
};
