/**
 * Problem: LeetCode 3534 - Path Existence Queries in a Graph II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @param {number[]} nums
 * @param {number} maxDiff
 * @param {number[][]} queries
 * @return {number[]}
 */
var pathExistenceQueries = function(n, nums, maxDiff, queries) {
    const pairs = new Array(n);
    for (let i = 0; i < n; i++) {
        pairs[i] = [nums[i], i];
    }

    pairs.sort((a, b) => a[0] - b[0]);

    const LOG = 20;
    const jump = Array.from({ length: n }, () => new Int32Array(LOG));

    let r = n - 1;
    for (let l = n - 1; l >= 0; l--) {
        while (pairs[r][0] - pairs[l][0] > maxDiff) {
            r--;
        }

        const from = pairs[l][1];
        const to = pairs[r][1];

        jump[from][0] = to;

        for (let k = 1; k < LOG; k++) {
            jump[from][k] = jump[jump[from][k - 1]][k - 1];
        }
    }

    const ans = new Int32Array(queries.length);

    for (let t = 0; t < queries.length; t++) {
        let u = queries[t][0];
        let v = queries[t][1];

        if (nums[u] > nums[v]) {
            const temp = u;
            u = v;
            v = temp;
        }

        if (u === v) {
            ans[t] = 0;
            continue;
        }

        if (nums[u] === nums[v]) {
            ans[t] = 1;
            continue;
        }

        let dist = 0;

        for (let k = LOG - 1; k >= 0; k--) {
            if (nums[jump[u][k]] < nums[v]) {
                dist += 1 << k;
                u = jump[u][k];
            }
        }

        if (nums[jump[u][0]] < nums[v]) {
            ans[t] = -1;
        } else {
            ans[t] = dist + 1;
        }
    }

    return Array.from(ans);
};
