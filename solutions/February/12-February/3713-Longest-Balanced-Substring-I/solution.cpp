/**
 * Problem: LeetCode 3713 - Longest Balanced Substring I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int longestBalanced(string s) {
        int n = s.length();
        int maxLen = 0;
        int freq[26];

        for (int i = 0; i < n; i++) {
            if (n - i <= maxLen) {
                break;
            }
            fill(begin(freq), end(freq), 0);
            int distinct = 0;
            int maxFreq = 0;

            for (int j = i; j < n; j++) {
                int c = s[j] - 'a';
                if (freq[c] == 0) {
                    distinct++;
                }
                freq[c]++;
                if (freq[c] > maxFreq) {
                    maxFreq = freq[c];
                }

                int len = j - i + 1;
                if (len == distinct * maxFreq) {
                    if (len > maxLen) {
                        maxLen = len;
                    }
                }
            }
        }

        return maxLen;
    }
};
