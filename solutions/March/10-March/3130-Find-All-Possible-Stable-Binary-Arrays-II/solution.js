/**
 * Problem: LeetCode 3130 - Find All Possible Stable Binary Arrays II
 * Difficulty: Hard
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
    const MOD = 1000000007;

    // dp0[i][j]: valid stable arrays with i zeros and j ones ending with 0
    // dp1[i][j]: valid stable arrays with i zeros and j ones ending with 1
    const dp0 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));
    const dp1 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));

    for (let i = 1; i <= Math.min(zero, limit); i++) {
        dp0[i][0] = 1;
    }
    for (let j = 1; j <= Math.min(one, limit); j++) {
        dp1[0][j] = 1;
    }

    for (let i = 1; i <= zero; i++) {
        for (let j = 1; j <= one; j++) {
            let val0 = dp0[i - 1][j] + dp1[i - 1][j];
            if (i > limit) {
                val0 -= dp1[i - 1 - limit][j];
            }
            dp0[i][j] = (val0 % MOD + MOD) % MOD;

            let val1 = dp0[i][j - 1] + dp1[i][j - 1];
            if (j > limit) {
                val1 -= dp0[i][j - 1 - limit];
            }
            dp1[i][j] = (val1 % MOD + MOD) % MOD;
        }
    }

    return (dp0[zero][one] + dp1[zero][one]) % MOD;
};
