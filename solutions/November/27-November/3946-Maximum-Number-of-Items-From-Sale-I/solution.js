/**
 * Problem: LeetCode 3946 - Maximum Number of Items From Sale I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function(items, budget) {
    const n = items.length;
    const f = new Int32Array(n);
    let minPrice = Infinity;

    for (let i = 0; i < n; i++) {
        minPrice = Math.min(minPrice, items[i][1]);
        for (let j = 0; j < n; j++) {
            if (i !== j && items[j][0] % items[i][0] === 0) {
                f[i]++;
            }
        }
    }

    const dp = new Int32Array(budget + 1);

    // Step 1: 0/1 Knapsack for first copy of each item
    for (let i = 0; i < n; i++) {
        const price = items[i][1];
        const value = 1 + f[i];
        for (let b = budget; b >= price; b--) {
            if (dp[b - price] + value > dp[b]) {
                dp[b] = dp[b - price] + value;
            }
        }
    }

    // Step 2: Unbounded Knapsack for extra copies using cheapest item
    for (let b = minPrice; b <= budget; b++) {
        if (dp[b - minPrice] + 1 > dp[b]) {
            dp[b] = dp[b - minPrice] + 1;
        }
    }

    return dp[budget];
};
