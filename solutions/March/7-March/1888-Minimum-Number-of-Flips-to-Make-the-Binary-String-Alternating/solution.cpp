/**
 * Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minFlips(string s) {
        int n = s.length();
        int diff1 = 0; // Mismatches with pattern starting with '0'
        int diff2 = 0; // Mismatches with pattern starting with '1'
        int minFlips = n;

        // Slide window of length n across virtual concatenated string s + s
        for (int i = 0; i < 2 * n; i++) {
            char curr = s[i % n];
            char target1 = (i % 2 == 0) ? '0' : '1';
            char target2 = (i % 2 == 0) ? '1' : '0';

            if (curr != target1) diff1++;
            if (curr != target2) diff2++;

            if (i >= n) {
                char out = s[(i - n) % n];
                char outTarget1 = ((i - n) % 2 == 0) ? '0' : '1';
                char outTarget2 = ((i - n) % 2 == 0) ? '1' : '0';

                if (out != outTarget1) diff1--;
                if (out != outTarget2) diff2--;
            }

            if (i >= n - 1) {
                minFlips = min({minFlips, diff1, diff2});
            }
        }

        return minFlips;
    }
};
