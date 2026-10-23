/**
 * Problem: LeetCode 835 - Image Overlap
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
var largestOverlap = function(img1, img2) {
    const n = img1.length;
    let maxOverlap = 0;

    function countOverlap(dx, dy) {
        let count = 0;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                const nr = r + dy;
                const nc = c + dx;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                    if (img1[r][c] === 1 && img2[nr][nc] === 1) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    for (let dy = -(n - 1); dy <= n - 1; dy++) {
        for (let dx = -(n - 1); dx <= n - 1; dx++) {
            maxOverlap = Math.max(maxOverlap, countOverlap(dx, dy));
        }
    }

    return maxOverlap;
};
