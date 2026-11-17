/**
 * Problem: LeetCode 2911 - Minimum Changes to Make K Semi-palindromes
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function(s, k) {
    const n = s.length;
    const INF = 1_000_000;

    const cost = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const len = j - i + 1;
            if (len === 1) {
                cost[i][j] = INF;
                continue;
            }

            let best = INF;
            for (let d = 1; d < len; d++) {
                if (len % d !== 0) continue;

                let changes = 0;
                const m = Math.floor(len / d);
                for (let r = 0; r < d; r++) {
                    for (let a = 0, b = m - 1; a < b; a++, b--) {
                        if (s[i + r + a * d] !== s[i + r + b * d]) {
                            changes++;
                        }
                    }
                }
                best = Math.min(best, changes);
            }
            cost[i][j] = best;
        }
    }

    const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(INF));
    dp[0][0] = 0;

    for (let j = 1; j <= k; j++) {
        for (let p = 2 * j; p <= n; p++) {
            for (let q = 2 * (j - 1); q <= p - 2; q++) {
                if (dp[j - 1][q] >= INF) continue;
                dp[j][p] = Math.min(dp[j][p], dp[j - 1][q] + cost[q][p - 1]);
            }
        }
    }

    return dp[k][n];
};
