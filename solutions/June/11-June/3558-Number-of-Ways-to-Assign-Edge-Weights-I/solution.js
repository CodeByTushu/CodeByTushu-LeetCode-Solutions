/**
 * @param {number[][]} edges
 * @return {number}
 */
var assignEdgeWeights = function(edges) {
    const MOD = 1000000007;
    const n = edges.length + 1;

    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    // Find maximum depth from root (node 1)
    let maxDepth = 0;
    const vis = new Uint8Array(n + 1);

    const q = [[1, 0]];
    vis[1] = 1;
    let head = 0;

    while (head < q.length) {
        const [node, depth] = q[head++];
        maxDepth = Math.max(maxDepth, depth);

        for (const nxt of graph[node]) {
            if (!vis[nxt]) {
                vis[nxt] = 1;
                q.push([nxt, depth + 1]);
            }
        }
    }

    // Number of odd-sum assignments on a path of length maxDepth
    let ans = 1;
    for (let i = 1; i < maxDepth; i++) {
        ans = (ans * 2) % MOD;
    }

    return ans;
};
