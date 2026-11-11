/**
 * Problem: LeetCode 3789 - Minimum Cost to Acquire Required Items
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} cost1
 * @param {number} cost2
 * @param {number} costBoth
 * @param {number} need1
 * @param {number} need2
 * @return {number}
 */
var minimumCost = function(cost1, cost2, costBoth, need1, need2) {
    const common = Math.min(need1, need2);
    const rem1 = need1 - common;
    const rem2 = need2 - common;

    // Option 1: Buy only Type 1 and Type 2 items separately
    const option1 = need1 * cost1 + need2 * cost2;

    // Option 2: Buy max(need1, need2) Type 3 items to cover both needs
    const option2 = Math.max(need1, need2) * costBoth;

    // Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
    const pairCost = Math.min(cost1 + cost2, costBoth);
    const option3 = common * pairCost + rem1 * Math.min(cost1, costBoth) + rem2 * Math.min(cost2, costBoth);

    return Math.min(option1, option2, option3);
};
