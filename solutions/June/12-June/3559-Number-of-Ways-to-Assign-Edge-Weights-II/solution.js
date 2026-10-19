/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var assignEdgeWeights = function(edges, queries) {
    const MOD = 1000000007;
    const LOG = 17;
    const n = edges.length + 1;

    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const up = Array.from({ length: n + 1 }, () => new Int32Array(LOG + 1));
    const depth = new Int32Array(n + 1);

    // Iterative BFS to prevent call stack overflow on deep trees
    const queue = [1];
    const visited = new Uint8Array(n + 1);
    visited[1] = 1;
    let head = 0;

    while (head < queue.length) {
        const node = queue[head++];
        for (const nxt of graph[node]) {
            if (!visited[nxt]) {
                visited[nxt] = 1;
                depth[nxt] = depth[node] + 1;
                up[nxt][0] = node;
                queue.push(nxt);
            }
        }
    }

    for (let j = 1; j <= LOG; j++) {
        for (let i = 1; i <= n; i++) {
            up[i][j] = up[up[i][j - 1]][j - 1];
        }
    }

    const pow2 = new Int32Array(n + 1);
    pow2[0] = 1;
    for (let i = 1; i <= n; i++) {
        pow2[i] = (pow2[i - 1] * 2) % MOD;
    }

    const getLCA = (u, v) => {
        if (depth[u] < depth[v]) {
            let temp = u;
            u = v;
            v = temp;
        }

        const diff = depth[u] - depth[v];
        for (let j = LOG; j >= 0; j--) {
            if ((diff >> j) & 1) {
                u = up[u][j];
            }
        }

        if (u === v) return u;

        for (let j = LOG; j >= 0; j--) {
            if (up[u][j] !== up[v][j]) {
                u = up[u][j];
                v = up[v][j];
            }
        }

        return up[u][0];
    };

    const ans = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        const u = queries[i][0];
        const v = queries[i][1];
        const lca = getLCA(u, v);
        const len = depth[u] + depth[v] - 2 * depth[lca];

        if (len === 0) {
            ans[i] = 0;
        } else {
            ans[i] = pow2[len - 1];
        }
    }

    return ans;
};
