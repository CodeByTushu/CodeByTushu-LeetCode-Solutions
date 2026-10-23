/**
 * Problem: LeetCode 1401 - Circle and Rectangle Overlapping
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {boolean}
 */
var checkOverlap = function(radius, xCenter, yCenter, x1, y1, x2, y2) {
    const closestX = Math.max(x1, Math.min(x2, xCenter));
    const closestY = Math.max(y1, Math.min(y2, yCenter));
    const dx = xCenter - closestX;
    const dy = yCenter - closestY;
    return dx * dx + dy * dy <= radius * radius;
};
