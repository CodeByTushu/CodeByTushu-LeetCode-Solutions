/**
 * Problem: LeetCode 3841 - Palindromic Path Queries in a Tree
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */
var palindromePath = function(n, edges, s, queries) {
    const bit = new Int32Array(n + 3);

    function upd(i, v) {
        for (; i <= n + 1; i += i & -i) bit[i] ^= v;
    }

    function qry(i) {
        let r = 0;
        for (; i > 0; i -= i & -i) r ^= bit[i];
        return r;
    }

    // Flat adjacency list for optimal cache locality
    const head = new Int32Array(n).fill(-1);
    const nxt = new Int32Array(2 * (n - 1));
    const to = new Int32Array(2 * (n - 1));
    let ec = 0;

    for (let i = 0; i < edges.length; i++) {
        const u = edges[i][0];
        const v = edges[i][1];
        to[ec] = v; nxt[ec] = head[u]; head[u] = ec++;
        to[ec] = u; nxt[ec] = head[v]; head[v] = ec++;
    }

    const arr = s.split('');
    const LOG = 17;
    const up = Array.from({ length: LOG }, () => new Int32Array(n));
    const depth = new Int32Array(n);
    const tin = new Int32Array(n);
    const tout = new Int32Array(n);
    const base = new Int32Array(n);
    const parent = new Int32Array(n);
    const ptr = head.slice();
    const stack = new Int32Array(n);
    let top = 0;
    let timer = 0;

    // Iterative Euler Tour DFS (Zero StackOverflow risk)
    stack[top++] = 0;
    parent[0] = -1;
    up[0][0] = 0;
    tin[0] = ++timer;
    base[0] = 1 << (arr[0].charCodeAt(0) - 97);

    while (top > 0) {
        const u = stack[top - 1];
        if (ptr[u] !== -1) {
            const e = ptr[u];
            ptr[u] = nxt[e];
            const v = to[e];
            if (v === parent[u]) continue;
            parent[v] = u;
            depth[v] = depth[u] + 1;
            base[v] = base[u] ^ (1 << (arr[v].charCodeAt(0) - 97));
            up[0][v] = u;
            tin[v] = ++timer;
            stack[top++] = v;
        } else {
            tout[u] = timer;
            top--;
        }
    }

    // Binary Lifting Table
    for (let k = 1; k < LOG; k++) {
        for (let v = 0; v < n; v++) {
            up[k][v] = up[k - 1][up[k - 1][v]];
        }
    }

    const ans = [];

    for (let i = 0; i < queries.length; i++) {
        const parts = queries[i].split(' ');
        if (parts[0] === 'update') {
            const u = Number(parts[1]);
            const c = parts[2];
            if (arr[u] === c) continue;
            const d = (1 << (arr[u].charCodeAt(0) - 97)) ^ (1 << (c.charCodeAt(0) - 97));
            upd(tin[u], d);
            upd(tout[u] + 1, d);
            arr[u] = c;
        } else {
            let a = Number(parts[1]);
            let b = Number(parts[2]);

            // Binary Lifting LCA
            if (depth[a] < depth[b]) {
                const t = a; a = b; b = t;
            }
            const diff = depth[a] - depth[b];
            for (let k = 0; k < LOG; k++) {
                if ((diff >> k) & 1) a = up[k][a];
            }

            let lca;
            if (a === b) {
                lca = a;
            } else {
                for (let k = LOG - 1; k >= 0; k--) {
                    if (up[k][a] !== up[k][b]) {
                        a = up[k][a];
                        b = up[k][b];
                    }
                }
                lca = up[0][a];
            }

            const pu = base[Number(parts[1])] ^ qry(tin[Number(parts[1])]);
            const pv = base[Number(parts[2])] ^ qry(tin[Number(parts[2])]);
            const mask = pu ^ pv ^ (1 << (arr[lca].charCodeAt(0) - 97));

            ans.push((mask & (mask - 1)) === 0);
        }
    }

    return ans;
};
