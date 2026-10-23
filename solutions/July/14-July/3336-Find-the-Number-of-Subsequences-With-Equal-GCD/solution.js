/**
 * Problem: LeetCode 3336 - Find the Number of Subsequences With Equal GCD
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * Computes the Greatest Common Divisor using the Euclidean algorithm
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function gcd(a, b) {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var subsequencePairCount = function(nums) {
    const MOD = 1_000_000_007;
    let maxVal = 0;
    for (const x of nums) {
        if (x > maxVal) maxVal = x;
    }

    // dp[g1][g2] stores the count of pairs of disjoint subsequences
    // with running GCD g1 for the first subsequence and g2 for the second (0 means empty).
    let dp = Array.from({ length: maxVal + 1 }, () => new Int32Array(maxVal + 1));
    dp[0][0] = 1;

    for (const num of nums) {
        const next = Array.from({ length: maxVal + 1 }, (_, i) => new Int32Array(dp[i]));

        for (let g1 = 0; g1 <= maxVal; g1++) {
            for (let g2 = 0; g2 <= maxVal; g2++) {
                const val = dp[g1][g2];
                if (val === 0) continue;

                // Option 1: Place num into the first subsequence
                const ng1 = g1 === 0 ? num : gcd(g1, num);
                next[ng1][g2] = (next[ng1][g2] + val) % MOD;

                // Option 2: Place num into the second subsequence
                const ng2 = g2 === 0 ? num : gcd(g2, num);
                next[g1][ng2] = (next[g1][ng2] + val) % MOD;
            }
        }

        dp = next;
    }

    let ans = 0;
    for (let g = 1; g <= maxVal; g++) {
        ans = (ans + dp[g][g]) % MOD;
    }

    return ans;
};
