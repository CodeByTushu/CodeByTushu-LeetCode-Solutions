/**
 * Problem: LeetCode 3121 - Count the Number of Special Characters II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    int numberOfSpecialChars(string word) {
        vector<int> lastLower(26, -1);
        vector<int> firstUpper(26, -1);

        int n = word.size();
        for (int i = 0; i < n; i++) {
            char ch = word[i];
            if (ch >= 'a' && ch <= 'z') {
                lastLower[ch - 'a'] = i;
            } else if (ch >= 'A' && ch <= 'Z') {
                int idx = ch - 'A';
                if (firstUpper[idx] == -1) {
                    firstUpper[idx] = i;
                }
            }
        }

        int specialCount = 0;
        for (int i = 0; i < 26; i++) {
            if (lastLower[i] != -1 && firstUpper[i] != -1 && lastLower[i] < firstUpper[i]) {
                specialCount++;
            }
        }

        return specialCount;
    }
};
