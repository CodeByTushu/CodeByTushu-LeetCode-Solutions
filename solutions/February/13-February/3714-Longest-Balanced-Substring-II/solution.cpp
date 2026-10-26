/**
 * Problem: LeetCode 3714 - Longest Balanced Substring II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

class Solution {
public:
    int longestBalanced(string s) {
        int n = s.length();
        int maxLen = 1;

        // Case 1: Exactly 1 distinct character
        int curRun = 1;
        for (int i = 1; i < n; i++) {
            if (s[i] == s[i - 1]) {
                curRun++;
            } else {
                curRun = 1;
            }
            if (curRun > maxLen) {
                maxLen = curRun;
            }
        }

        // Case 2: Exactly 2 distinct characters
        vector<vector<char>> pairs = {
            {'a', 'b', 'c'},
            {'b', 'c', 'a'},
            {'a', 'c', 'b'}
        };

        for (const auto& p : pairs) {
            char c1 = p[0], c2 = p[1], avoid = p[2];
            int start = 0;
            while (start < n) {
                while (start < n && s[start] == avoid) {
                    start++;
                }
                if (start >= n) {
                    break;
                }
                int end = start;
                while (end < n && s[end] != avoid) {
                    end++;
                }

                unordered_map<int, int> map;
                map[0] = start - 1;
                int diff = 0;
                for (int i = start; i < end; i++) {
                    if (s[i] == c1) {
                        diff++;
                    } else if (s[i] == c2) {
                        diff--;
                    }

                    auto it = map.find(diff);
                    if (it != map.end()) {
                        int len = i - it->second;
                        if (len > maxLen) {
                            maxLen = len;
                        }
                    } else {
                        map[diff] = i;
                    }
                }
                start = end;
            }
        }

        // Case 3: Exactly 3 distinct characters
        unordered_map<long long, int> stateMap;
        stateMap[encode(0, 0)] = -1;
        int ca = 0, cb = 0, cc = 0;

        for (int i = 0; i < n; i++) {
            if (s[i] == 'a') {
                ca++;
            } else if (s[i] == 'b') {
                cb++;
            } else if (s[i] == 'c') {
                cc++;
            }

            long long key = encode(ca - cb, cb - cc);
            auto it = stateMap.find(key);
            if (it != stateMap.end()) {
                int len = i - it->second;
                if (len > maxLen) {
                    maxLen = len;
                }
            } else {
                stateMap[key] = i;
            }
        }

        return maxLen;
    }

private:
    long long encode(int d1, int d2) {
        return (((long long)d1) << 32) | ((unsigned int)d2);
    }
};
