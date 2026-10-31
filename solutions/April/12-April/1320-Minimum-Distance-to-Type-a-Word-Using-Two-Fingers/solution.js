/**
 * Problem: LeetCode 1320 - Minimum Distance to Type a Word Using Two Fingers
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string} word
 * @return {number}
 */
var minimumDistance = function(word) {
    const dist = (a, b) => {
        if (a === 26 || b === 26) return 0;
        const r1 = Math.floor(a / 6), c1 = a % 6;
        const r2 = Math.floor(b / 6), c2 = b % 6;
        return Math.abs(r1 - r2) + Math.abs(c1 - c2);
    };

    let dp = new Array(27).fill(Infinity);
    dp[26] = 0;

    for (let i = 1; i < word.length; i++) {
        const curr = word.charCodeAt(i) - 65;
        const prev = word.charCodeAt(i - 1) - 65;
        const nextDp = new Array(27).fill(Infinity);

        for (let j = 0; j < 27; j++) {
            if (dp[j] === Infinity) continue;

            // Case 1: finger at prev moves to curr
            const cost1 = dp[j] + dist(prev, curr);
            if (cost1 < nextDp[j]) nextDp[j] = cost1;

            // Case 2: finger at j moves to curr
            const cost2 = dp[j] + dist(j, curr);
            if (cost2 < nextDp[prev]) nextDp[prev] = cost2;
        }

        dp = nextDp;
    }

    return Math.min(...dp);
};
