/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of invocations) {
        graph[u].push(v);
    }

    const suspicious = new Uint8Array(n);
    const queue = [k];
    suspicious[k] = 1;
    let head = 0;

    while (head < queue.length) {
        const curr = queue[head++];
        for (const next of graph[curr]) {
            if (!suspicious[next]) {
                suspicious[next] = 1;
                queue.push(next);
            }
        }
    }

    for (const [u, v] of invocations) {
        if (!suspicious[u] && suspicious[v]) {
            const all = new Array(n);
            for (let i = 0; i < n; i++) all[i] = i;
            return all;
        }
    }

    const result = [];
    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) {
            result.push(i);
        }
    }

    return result;
};
