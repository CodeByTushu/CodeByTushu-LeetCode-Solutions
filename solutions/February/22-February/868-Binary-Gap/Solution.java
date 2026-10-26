/**
 * Problem: LeetCode 868 - Binary Gap
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int binaryGap(int n) {
        int lastPos = -1;
        int maxGap = 0;
        int currPos = 0;

        while (n > 0) {
            if ((n & 1) == 1) {
                if (lastPos != -1) {
                    maxGap = Math.max(maxGap, currPos - lastPos);
                }
                lastPos = currPos;
            }
            n >>= 1;
            currPos++;
        }

        return maxGap;
    }
}
