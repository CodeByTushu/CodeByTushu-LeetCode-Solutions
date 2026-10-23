/**
 * Problem: LeetCode 1840 - Maximum Building Height
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
var maxBuilding = function(n, restrictions) {
    const list = [[1, 0]];
    for (const r of restrictions) {
        list.push([r[0], r[1]]);
    }

    let hasN = false;
    for (const r of list) {
        if (r[0] === n) {
            hasN = true;
            break;
        }
    }
    if (!hasN) {
        list.push([n, n - 1]);
    }

    list.sort((a, b) => a[0] - b[0]);

    const m = list.length;

    // Left to right pass
    for (let i = 1; i < m; i++) {
        const dist = list[i][0] - list[i - 1][0];
        list[i][1] = Math.min(list[i][1], list[i - 1][1] + dist);
    }

    // Right to left pass
    for (let i = m - 2; i >= 0; i--) {
        const dist = list[i + 1][0] - list[i][0];
        list[i][1] = Math.min(list[i][1], list[i + 1][1] + dist);
    }

    let ans = 0;
    for (let i = 1; i < m; i++) {
        const x1 = list[i - 1][0];
        const h1 = list[i - 1][1];
        const x2 = list[i][0];
        const h2 = list[i][1];
        const dist = x2 - x1;
        const peak = Math.floor((h1 + h2 + dist) / 2);
        ans = Math.max(ans, peak);
    }

    return ans;
};
