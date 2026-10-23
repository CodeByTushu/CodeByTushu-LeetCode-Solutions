#include <string>
#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 3614 - Process String with Special Operations II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    char processStr(string s, long long k) {
        int n = s.length();
        vector<long long> len(n);
        long long cur = 0;

        // Calculate final length after every operation
        for (int i = 0; i < n; i++) {
            char ch = s[i];
            if (ch >= 'a' && ch <= 'z') {
                cur++;
            } else if (ch == '*') {
                if (cur > 0) cur--;
            } else if (ch == '#') {
                cur = min(cur * 2, (long long)1e15 + 5);
            } else { // '%'
                // length unchanged
            }
            len[i] = cur;
        }

        if (k >= cur) {
            return '.';
        }

        // Work backwards
        for (int i = n - 1; i >= 0; i--) {
            char ch = s[i];
            long long before = (i == 0) ? 0 : len[i - 1];

            if (ch >= 'a' && ch <= 'z') {
                if (k == before) {
                    return ch;
                }
            } else if (ch == '*') {
                // Removed last character; existing indices stay unchanged.
            } else if (ch == '#') {
                if (before > 0 && k >= before) {
                    k -= before;
                }
            } else { // '%'
                if (before > 0) {
                    k = before - 1 - k;
                }
            }
        }

        return '.';
    }
};
