/**
 * Problem: LeetCode 2747 - Count Zero Request Servers
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function(n, logs, x, queries) {
    // Sort logs by timestamp ascending
    logs.sort((a, b) => a[1] - b[1]);

    const qn = queries.length;
    const order = Array.from({ length: qn }, (_, i) => i);
    order.sort((a, b) => queries[a] - queries[b]);

    const cnt = new Int32Array(n + 1);
    const ans = new Int32Array(qn);
    let active = 0;
    let l = 0, r = 0;
    const m = logs.length;

    for (let i = 0; i < qn; i++) {
        const idx = order[i];
        const q = queries[idx];

        // Add logs with time <= q
        while (r < m && logs[r][1] <= q) {
            const server = logs[r][0];
            if (cnt[server] === 0) active++;
            cnt[server]++;
            r++;
        }

        // Remove logs with time < q - x
        while (l < r && logs[l][1] < q - x) {
            const server = logs[l][0];
            cnt[server]--;
            if (cnt[server] === 0) active--;
            l++;
        }

        ans[idx] = n - active;
    }

    return Array.from(ans);
};
