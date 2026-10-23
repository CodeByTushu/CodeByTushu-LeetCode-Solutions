/**
 * Problem: LeetCode 940 - Distinct Subsequences II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function(s) {
    const MOD = 1000000007n;
    const dp = new Array(26).fill(0n);

    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i) - 97;
        let total = 1n;
        for (let j = 0; j < 26; j++) {
            total = (total + dp[j]) % MOD;
        }
        dp[c] = total;
    }

    let ans = 0n;
    for (let i = 0; i < 26; i++) {
        ans = (ans + dp[i]) % MOD;
    }

    return Number(ans);
};
