/**
 * Problem: LeetCode 2943 - Maximize Area of Square Hole in Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} hBars
 * @param {number[]} vBars
 * @return {number}
 */
var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
    function getMaxGap(bars) {
        bars.sort((a, b) => a - b);
        let maxConsecutive = 1;
        let currentConsecutive = 1;

        for (let i = 1; i < bars.length; i++) {
            if (bars[i] === bars[i - 1] + 1) {
                currentConsecutive++;
            } else {
                currentConsecutive = 1;
            }
            maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
        }

        return maxConsecutive + 1;
    }

    const side = Math.min(getMaxGap(hBars), getMaxGap(vBars));
    return side * side;
};
