/**
 * Problem: LeetCode 3129 - Find All Possible Stable Binary Arrays I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function(zero, one, limit) {
    const MOD = 1000000007n;

    // dp0[i][j]: valid stable arrays with i zeros and j ones ending with 0
    // dp1[i][j]: valid stable arrays with i zeros and j ones ending with 1
    const dp0 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));
    const dp1 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));

    for (let i = 1; i <= Math.min(zero, limit); i++) {
        dp0[i][0] = 1n;
    }
    for (let j = 1; j <= Math.min(one, limit); j++) {
        dp1[0][j] = 1n;
    }

    for (let i = 1; i <= zero; i++) {
        for (let j = 1; j <= one; j++) {
            dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
            if (i > limit) {
                dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD;
            }

            dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
            if (j > limit) {
                dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD;
            }
        }
    }

    return Number((dp0[zero][one] + dp1[zero][one]) % MOD);
};
