/**
 * Problem: LeetCode 3474 - Lexicographically Smallest Generated String
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    string generateString(string str1, string str2) {
        int n = str1.length();
        int m = str2.length();
        int sz = n + m - 1;

        string ans(sz, '\0');
        vector<bool> modifiable(sz, true);

        // 1. Enforce 'T' constraints
        for (int i = 0; i < n; ++i) {
            if (str1[i] == 'T') {
                for (int j = 0; j < m; ++j) {
                    int pos = i + j;
                    char ch = str2[j];
                    if (ans[pos] != '\0' && ans[pos] != ch) {
                        return "";
                    }
                    ans[pos] = ch;
                    modifiable[pos] = false;
                }
            }
        }

        // 2. Fill unassigned slots with 'a'
        for (int i = 0; i < sz; ++i) {
            if (ans[i] == '\0') {
                ans[i] = 'a';
            }
        }

        // 3. Resolve 'F' constraints
        for (int i = 0; i < n; ++i) {
            if (str1[i] == 'F') {
                bool match = true;
                for (int j = 0; j < m; ++j) {
                    if (ans[i + j] != str2[j]) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    int modifiablePos = -1;
                    for (int j = m - 1; j >= 0; --j) {
                        if (modifiable[i + j]) {
                            modifiablePos = i + j;
                            break;
                        }
                    }

                    if (modifiablePos == -1) {
                        return "";
                    }

                    ans[modifiablePos] = 'b';
                    modifiable[modifiablePos] = false;
                }
            }
        }

        // 4. Final verification
        for (int i = 0; i < n; ++i) {
            bool match = true;
            for (int j = 0; j < m; ++j) {
                if (ans[i + j] != str2[j]) {
                    match = false;
                    break;
                }
            }
            if (str1[i] == 'T' && !match) return "";
            if (str1[i] == 'F' && match) return "";
        }

        return ans;
    }
};
