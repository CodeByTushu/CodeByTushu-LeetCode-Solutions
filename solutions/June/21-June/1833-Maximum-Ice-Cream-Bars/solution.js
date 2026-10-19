/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function(costs, coins) {
    // Maximum possible cost is 100000
    const freq = new Int32Array(100001);

    // Count frequencies
    for (const cost of costs) {
        freq[cost]++;
    }

    let ans = 0;

    // Buy cheapest ice creams first
    for (let cost = 1; cost <= 100000; cost++) {
        if (freq[cost] === 0) continue;

        const canBuy = Math.min(freq[cost], Math.floor(coins / cost));

        ans += canBuy;
        coins -= canBuy * cost;

        if (coins < cost) {
            // Can't afford any more at this cost or higher
            continue;
        }
    }

    return ans;
};
