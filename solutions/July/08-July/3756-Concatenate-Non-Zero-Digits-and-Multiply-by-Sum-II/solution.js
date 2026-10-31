/**
 * Problem: LeetCode 3756 - Concatenate Non-Zero Digits and Multiply by Sum II
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var sumAndMultiply = function(s, queries) {
    const MOD = 1000000007n;
    const n = s.length;

    // Precompute powers of 10 modulo MOD
    const pow10 = new BigInt64Array(n + 1);
    pow10[0] = 1n;
    for (let i = 1; i <= n; i++) {
        pow10[i] = (pow10[i - 1] * 10n) % MOD;
    }

    // Prefix arrays for concatenated value, non-zero count, and digit sum
    const prefVal = new BigInt64Array(n + 1);
    const prefSum = new BigInt64Array(n + 1);
    const prefCnt = new Int32Array(n + 1);

    for (let i = 0; i < n; i++) {
        const d = BigInt(s.charCodeAt(i) - 48);
        prefSum[i + 1] = prefSum[i] + d;
        if (d !== 0n) {
            prefCnt[i + 1] = prefCnt[i] + 1;
            prefVal[i + 1] = (prefVal[i] * 10n + d) % MOD;
        } else {
            prefCnt[i + 1] = prefCnt[i];
            prefVal[i + 1] = prefVal[i];
        }
    }

    const ans = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        const l = queries[i][0];
        const r = queries[i][1];
        const cnt = prefCnt[r + 1] - prefCnt[l];
        const sum = prefSum[r + 1] - prefSum[l];
        let val = (prefVal[r + 1] - (prefVal[l] * pow10[cnt]) % MOD) % MOD;
        if (val < 0n) val += MOD;
        ans[i] = Number((val * (sum % MOD)) % MOD);
    }

    return ans;
};
