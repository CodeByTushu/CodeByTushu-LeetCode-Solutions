/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const n = word.length;
    let totalCost = 0;
    for (let i = 0; i < n; i++) {
        totalCost += Math.floor(i / 8) + 1;
    }
    return totalCost;
};
