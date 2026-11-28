/**
 * Problem: LeetCode 3947 - Maximum Number of Items From Sale II
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
    const cnt = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        cnt[items[i][0]]++;
    }

    const m = new Int32Array(n + 1);
    for (let d = 1; d <= n; d++) {
        for (let x = d; x <= n; x += d) {
            m[d] += cnt[x];
        }
    }

    let minPrice = Infinity;
    const candidates = new Array(n);
    for (let i = 0; i < n; i++) {
        const price = items[i][1];
        const f = m[items[i][0]] - 1;
        if (price < minPrice) minPrice = price;
        candidates[i] = [price, f];
    }

    candidates.sort((a, b) => a[0] - b[0]);

    let rem = BigInt(budget);
    let ans = 0n;
    const minP = BigInt(minPrice);
    const limit = 2n * minP;

    for (let i = 0; i < n; i++) {
        const p = BigInt(candidates[i][0]);
        const f = BigInt(candidates[i][1]);

        if (p >= limit) break;
        if (f === 0n) continue;

        const maxAfford = rem / p;
        const take = f < maxAfford ? f : maxAfford;
        rem -= take * p;
        ans += 2n * take;

        if (take < f) break;
    }

    ans += rem / minP;

    return Number(ans);
};
