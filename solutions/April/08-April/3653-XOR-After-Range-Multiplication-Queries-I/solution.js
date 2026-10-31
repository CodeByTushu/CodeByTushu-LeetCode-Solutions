/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007;

    for (let i = 0; i < queries.length; i++) {
        const [l, r, k, v] = queries[i];
        for (let idx = l; idx <= r; idx += k) {
            nums[idx] = (nums[idx] * v) % MOD;
        }
    }

    let xorSum = 0;
    for (let i = 0; i < nums.length; i++) {
        xorSum ^= nums[i];
    }

    return xorSum;
};
