/**
 * Problem: LeetCode 1569 - Number of Ways to Reorder Array to Get Same BST
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function(nums) {
    const MOD = 1000000007n;
    const n = nums.length;

    const C = Array.from({ length: n + 1 }, () => new BigInt64Array(n + 1));
    for (let i = 0; i <= n; i++) {
        C[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }

    function ways(arr) {
        const size = arr.length;
        if (size <= 2) return 1n;
        const root = arr[0];
        const left = [];
        const right = [];
        for (let i = 1; i < size; i++) {
            if (arr[i] < root) left.push(arr[i]);
            else right.push(arr[i]);
        }
        let res = C[size - 1][left.length];
        res = (res * ways(left)) % MOD;
        res = (res * ways(right)) % MOD;
        return res;
    }

    const total = ways(nums);
    return Number((total - 1n + MOD) % MOD);
};
