/**
 * Problem: LeetCode 696 - Count Binary Substrings
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int countBinarySubstrings(string s) {
        int prevRun = 0;
        int currRun = 1;
        int count = 0;

        for (int i = 1; i < (int)s.length(); i++) {
            if (s[i] == s[i - 1]) {
                currRun++;
            } else {
                count += min(prevRun, currRun);
                prevRun = currRun;
                currRun = 1;
            }
        }
        count += min(prevRun, currRun);

        return count;
    }
};
