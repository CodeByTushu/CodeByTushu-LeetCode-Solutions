#include <string>
#include <vector>

using namespace std;

/**
 * Problem: LeetCode 3720 - Lexicographically Smallest Permutation Greater Than Target
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    string lexGreaterPermutation(string s, string target) {
        int n = s.length();
        vector<int> cnt(26, 0);
        for (char c : s) {
            cnt[c - 'a']++;
        }

        int breakIndex = -1;
        vector<int> breakCnt;

        for (int i = 0; i < n; i++) {
            int tc = target[i] - 'a';

            // check if a character greater than target[i] is available right now
            bool found = false;
            for (int c = tc + 1; c < 26; c++) {
                if (cnt[c] > 0) {
                    found = true;
                    break;
                }
            }
            if (found) {
                breakIndex = i;         // candidate breakpoint (keep the rightmost one)
                breakCnt = cnt;         // save state at this point
            }

            // try to continue matching target as prefix
            if (cnt[tc] > 0) {
                cnt[tc]--;
            } else {
                break; // can't match prefix any further, no later breakpoints possible
            }
        }

        if (breakIndex == -1) {
            return ""; // no valid permutation strictly greater than target
        }

        string result;
        result.reserve(n);
        result.append(target, 0, breakIndex); // matched prefix

        int tc = target[breakIndex] - 'a';
        int chosen = -1;
        for (int c = tc + 1; c < 26; c++) {
            if (breakCnt[c] > 0) {
                chosen = c;
                break;
            }
        }
        breakCnt[chosen]--;
        result.push_back((char)('a' + chosen)); // smallest char strictly greater than target[breakIndex]

        // fill the rest with remaining letters in ascending order (smallest arrangement)
        for (int c = 0; c < 26; c++) {
            if (breakCnt[c] > 0) {
                result.append(breakCnt[c], (char)('a' + c));
            }
        }

        return result;
    }
};
