/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfSets = function(n, k) {
    const MOD = 1000000007;
    const total = n + k - 1;
    const choose = 2 * k;
    return combination(total, choose, MOD);
};

/**
 * @param {number} n
 * @param {number} r
 * @param {number} MOD
 * @return {number}
 */
function combination(n, r, MOD) {
    if (r > n) return 0;
    const dp = Array.from({ length: n + 1 }, () => new Int32Array(r + 1));
    for (let i = 0; i <= n; i++) dp[i][0] = 1;
    for (let i = 1; i <= n; i++) {
        const limit = Math.min(i, r);
        for (let j = 1; j <= limit; j++) {
            dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % MOD;
        }
    }
    return dp[n][r];
}
