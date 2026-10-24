/**
 * Problem: LeetCode 2943 - Maximize Area of Square Hole in Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int maximizeSquareHoleArea(int n, int m, int[] hBars, int[] vBars) {
        int maxHGap = getMaxGap(hBars);
        int maxVGap = getMaxGap(vBars);
        int side = Math.min(maxHGap, maxVGap);
        return side * side;
    }

    private int getMaxGap(int[] bars) {
        Arrays.sort(bars);
        int maxConsecutive = 1;
        int currentConsecutive = 1;

        for (int i = 1; i < bars.length; i++) {
            if (bars[i] == bars[i - 1] + 1) {
                currentConsecutive++;
            } else {
                currentConsecutive = 1;
            }
            maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
        }

        return maxConsecutive + 1;
    }
}
