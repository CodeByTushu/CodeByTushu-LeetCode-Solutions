/**
 * Problem: 2573. Find the String with LCP
 * Difficulty: Hard
 * Language: C++
 * 
 * Approach:
 * 1. Greedily build the lexicographically smallest candidate string by scanning
 *    from 0 to n - 1 and assigning available letters ('a' through 'z') to positions
 *    where lcp[i][j] > 0.
 * 2. Check DP recurrence in reverse order to ensure the candidate string actually
 *    produces the given LCP matrix.
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(n) auxiliary space (excluding returned string)
 */

#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string findTheString(vector<vector<int>>& lcp) {
        int n = lcp.size();
        string word(n, '\0');
        char curChar = 'a';

        for (int i = 0; i < n; ++i) {
            if (word[i] == '\0') {
                if (curChar > 'z') {
                    return "";
                }
                char ch = curChar++;
                for (int j = i; j < n; ++j) {
                    if (lcp[i][j] > 0) {
                        word[j] = ch;
                    }
                }
            }
        }

        // Validate via bottom-up LCP recurrence
        for (int i = n - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                int expected = (word[i] == word[j])
                    ? (1 + (i + 1 < n && j + 1 < n ? lcp[i + 1][j + 1] : 0))
                    : 0;
                if (lcp[i][j] != expected) {
                    return "";
                }
            }
        }

        return word;
    }
};
