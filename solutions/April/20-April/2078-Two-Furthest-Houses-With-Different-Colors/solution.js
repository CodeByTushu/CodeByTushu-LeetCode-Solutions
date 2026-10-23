/**
 * Problem: LeetCode 2078 - Two Furthest Houses With Different Colors
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function(colors) {
    const n = colors.length;
    let maxDist = 0;
    
    // The furthest house with a different color must pair with either the first or last house
    for (let i = 0; i < n; ++i) {
        if (colors[i] !== colors[0]) {
            if (i > maxDist) maxDist = i;
        }
        if (colors[i] !== colors[n - 1]) {
            const d = n - 1 - i;
            if (d > maxDist) maxDist = d;
        }
    }
    
    return maxDist;
};
