/**
 * Problem: LeetCode 3047 - Find the Largest Area of Square Inside Two Rectangles
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} bottomLeft
 * @param {number[][]} topRight
 * @return {number}
 */
var largestSquareArea = function(bottomLeft, topRight) {
    let maxSide = 0n;
    const n = bottomLeft.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const xMin = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
            const xMax = Math.min(topRight[i][0], topRight[j][0]);
            const yMin = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
            const yMax = Math.min(topRight[i][1], topRight[j][1]);

            const width = xMax - xMin;
            const height = yMax - yMin;

            if (width > 0 && height > 0) {
                const side = BigInt(Math.min(width, height));
                if (side > maxSide) {
                    maxSide = side;
                }
            }
        }
    }

    return Number(maxSide * maxSide);
};
