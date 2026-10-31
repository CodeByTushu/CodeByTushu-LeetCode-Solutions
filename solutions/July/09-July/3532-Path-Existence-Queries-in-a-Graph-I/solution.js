/**
 * Problem: LeetCode 3532 - Path Existence Queries in a Graph I
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @param {number[]} nums
 * @param {number} maxDiff
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var pathExistenceQueries = function(n, nums, maxDiff, queries) {
    const component = new Int32Array(n);
    let id = 0;

    // nums is sorted in non-decreasing order.
    // Consecutive differences > maxDiff partition the nodes into separate components.
    for (let i = 1; i < n; i++) {
        if (nums[i] - nums[i - 1] > maxDiff) {
            id++;
        }
        component[i] = id;
    }

    const ans = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        ans[i] = component[queries[i][0]] === component[queries[i][1]];
    }

    return ans;
};
