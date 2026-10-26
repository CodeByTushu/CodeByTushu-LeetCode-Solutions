/**
 * Problem: LeetCode 1653 - Minimum Deletions to Make String Balanced
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumDeletions(string s) {
        int bCount = 0;
        int deletions = 0;

        for (char c : s) {
            if (c == 'b') {
                bCount++;
            } else {
                // Either delete this 'a' or delete all previous 'b's
                deletions = min(deletions + 1, bCount);
            }
        }

        return deletions;
    }
};
