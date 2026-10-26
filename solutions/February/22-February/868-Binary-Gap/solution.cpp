/**
 * Problem: LeetCode 868 - Binary Gap
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <algorithm>

using namespace std;

class Solution {
public:
    int binaryGap(int n) {
        int lastPos = -1;
        int maxGap = 0;
        int currPos = 0;

        while (n > 0) {
            if (n & 1) {
                if (lastPos != -1) {
                    maxGap = max(maxGap, currPos - lastPos);
                }
                lastPos = currPos;
            }
            n >>= 1;
            currPos++;
        }

        return maxGap;
    }
};
