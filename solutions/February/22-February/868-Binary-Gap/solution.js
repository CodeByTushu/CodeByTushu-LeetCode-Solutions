/**
 * Problem: LeetCode 868 - Binary Gap
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function(n) {
    let lastPos = -1;
    let maxGap = 0;
    let currPos = 0;

    while (n > 0) {
        if ((n & 1) === 1) {
            if (lastPos !== -1) {
                maxGap = Math.max(maxGap, currPos - lastPos);
            }
            lastPos = currPos;
        }
        n >>>= 1;
        currPos++;
    }

    return maxGap;
};
