/**
 * Problem: LeetCode 3714 - Longest Balanced Substring II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int longestBalanced(String s) {
        int n = s.length();
        int maxLen = 1;

        // Case 1: Substring contains exactly 1 distinct character
        // The longest balanced substring is the longest consecutive run of identical characters.
        int curRun = 1;
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                curRun++;
            } else {
                curRun = 1;
            }
            if (curRun > maxLen) {
                maxLen = curRun;
            }
        }

        // Case 2: Substring contains exactly 2 distinct characters
        // Pairs: (a, b) avoiding c, (b, c) avoiding a, (a, c) avoiding b
        char[][] pairs = {
            {'a', 'b', 'c'},
            {'b', 'c', 'a'},
            {'a', 'c', 'b'}
        };

        for (char[] p : pairs) {
            char c1 = p[0], c2 = p[1], avoid = p[2];
            int start = 0;
            while (start < n) {
                while (start < n && s.charAt(start) == avoid) {
                    start++;
                }
                if (start >= n) {
                    break;
                }
                int end = start;
                while (end < n && s.charAt(end) != avoid) {
                    end++;
                }

                Map<Integer, Integer> map = new HashMap<>();
                map.put(0, start - 1);
                int diff = 0;
                for (int i = start; i < end; i++) {
                    char ch = s.charAt(i);
                    if (ch == c1) {
                        diff++;
                    } else if (ch == c2) {
                        diff--;
                    }

                    if (map.containsKey(diff)) {
                        int len = i - map.get(diff);
                        if (len > maxLen) {
                            maxLen = len;
                        }
                    } else {
                        map.put(diff, i);
                    }
                }
                start = end;
            }
        }

        // Case 3: Substring contains all 3 distinct characters
        // Equal frequencies: cnt[a] - cnt[b] == 0 and cnt[b] - cnt[c] == 0 relative to prefix.
        Map<Long, Integer> stateMap = new HashMap<>();
        stateMap.put(encode(0, 0), -1);
        int ca = 0, cb = 0, cc = 0;

        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            if (ch == 'a') {
                ca++;
            } else if (ch == 'b') {
                cb++;
            } else if (ch == 'c') {
                cc++;
            }

            long key = encode(ca - cb, cb - cc);
            if (stateMap.containsKey(key)) {
                int len = i - stateMap.get(key);
                if (len > maxLen) {
                    maxLen = len;
                }
            } else {
                stateMap.put(key, i);
            }
        }

        return maxLen;
    }

    private long encode(int d1, int d2) {
        return (((long) d1) << 32) | (d2 & 0xFFFFFFFFL);
    }
}
