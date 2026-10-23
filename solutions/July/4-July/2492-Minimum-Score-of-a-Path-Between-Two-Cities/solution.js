/**
 * Problem: LeetCode 2492 - Minimum Score of a Path Between Two Cities
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function(n, roads) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, d] of roads) {
        graph[u].push([v, d]);
        graph[v].push([u, d]);
    }

    const vis = new Array(n + 1).fill(false);
    const q = [1];
    vis[1] = true;

    let ans = Infinity;
    let head = 0;

    while (head < q.length) {
        const u = q[head++];

        for (const [v, d] of graph[u]) {
            if (d < ans) {
                ans = d;
            }

            if (!vis[v]) {
                vis[v] = true;
                q.push(v);
            }
        }
    }

    return ans;
};
