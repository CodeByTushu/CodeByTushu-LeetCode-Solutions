/**
 * @param {number[][]} edges
 * @param {boolean[]} online
 * @param {number} k
 * @return {number}
 */
var findMaxPathScore = function(edges, online, k) {
    const n = online.length;
    const graph = Array.from({ length: n }, () => []);
    let maxCost = 0;

    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        if (w > maxCost) maxCost = w;
    }

    function canReach(limit) {
        const indegree = new Int32Array(n);

        for (let u = 0; u < n; u++) {
            if (u !== 0 && u !== n - 1 && !online[u]) continue;
            for (const [v, w] of graph[u]) {
                if (v !== 0 && v !== n - 1 && !online[v]) continue;
                if (w < limit) continue;
                indegree[v]++;
            }
        }

        const q = [];
        let head = 0;
        for (let i = 0; i < n; i++) {
            if ((i === 0 || i === n - 1 || online[i]) && indegree[i] === 0) {
                q.push(i);
            }
        }

        const dist = new Float64Array(n).fill(Infinity);
        dist[0] = 0;

        while (head < q.length) {
            const u = q[head++];

            for (const [v, w] of graph[u]) {
                if (v !== 0 && v !== n - 1 && !online[v]) continue;
                if (w < limit) continue;

                if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }

                if (--indegree[v] === 0) {
                    q.push(v);
                }
            }
        }

        return dist[n - 1] <= k;
    }

    let lo = 0, hi = maxCost, ans = -1;

    while (lo <= hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        if (canReach(mid)) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return ans;
};
