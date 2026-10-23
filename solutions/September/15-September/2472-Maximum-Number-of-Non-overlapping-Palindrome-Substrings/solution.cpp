#include <string>
#include <vector>

using namespace std;

/**
 * Problem: LeetCode 2472 - Maximum Number of Non-overlapping Palindrome Substrings
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int maxPalindromes(string s, int k) {
        int n = s.length();
        vector<vector<bool>> isPalin(n, vector<bool>(n, false));
        
        for (int i = 0; i < n; i++) isPalin[i][i] = true;
        for (int i = 0; i < n - 1; i++) {
            isPalin[i][i + 1] = (s[i] == s[i + 1]);
        }
        for (int len = 3; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                isPalin[i][j] = (s[i] == s[j]) && isPalin[i + 1][j - 1];
            }
        }
        
        int count = 0;
        int i = 0;
        while (i <= n - k) {
            bool found = false;
            for (int len = k; len <= k + 1 && i + len - 1 < n; len++) {
                int j = i + len - 1;
                if (isPalin[i][j]) {
                    count++;
                    i = j + 1;
                    found = true;
                    break;
                }
            }
            if (!found) i++;
        }
        return count;
    }
};
