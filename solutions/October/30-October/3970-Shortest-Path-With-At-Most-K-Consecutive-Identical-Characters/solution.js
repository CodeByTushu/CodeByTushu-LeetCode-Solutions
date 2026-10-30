/**
 * Problem: LeetCode 3970 - Shortest Path With At Most K Consecutive Identical Characters
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(n, edges, labels, k) {
    const m = edges.length;
    const head = new Int32Array(n).fill(-1);
    const nxt = new Int32Array(m), to = new Int32Array(m), wt = new Int32Array(m);

    for (let i = 0; i < m; i++) {
        const u = edges[i][0];
        to[i] = edges[i][1]; wt[i] = edges[i][2];
        nxt[i] = head[u]; head[u] = i;
    }

    const INF = 2147483647;
    const dist = new Int32Array(n * (k + 1)).fill(INF);

    class MinHeap {
        constructor() { this.d = []; this.s = []; }
        push(dv, sv) {
            this.d.push(dv); this.s.push(sv);
            let i = this.d.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.d[i] < this.d[p]) { this._swap(i, p); i = p; } else break;
            }
        }
        pop() {
            const topD = this.d[0], topS = this.s[0];
            const lastD = this.d.pop(), lastS = this.s.pop();
            if (this.d.length > 0) {
                this.d[0] = lastD; this.s[0] = lastS;
                let i = 0, len = this.d.length;
                while ((i << 1) + 1 < len) {
                    let l = (i << 1) + 1, r = l + 1, best = i;
                    if (this.d[l] < this.d[best]) best = l;
                    if (r < len && this.d[r] < this.d[best]) best = r;
                    if (best !== i) { this._swap(i, best); i = best; } else break;
                }
            }
            return [topD, topS];
        }
        size() { return this.d.length; }
        _swap(i, j) {
            const td = this.d[i]; this.d[i] = this.d[j]; this.d[j] = td;
            const ts = this.s[i]; this.s[i] = this.s[j]; this.s[j] = ts;
        }
    }

    const pq = new MinHeap();
    const startState = 0 * (k + 1) + 1;
    dist[startState] = 0;
    pq.push(0, startState);

    while (pq.size() > 0) {
        const [d, state] = pq.pop();
        if (d > dist[state]) continue;

        const u = Math.floor(state / (k + 1));
        const r = state % (k + 1);

        if (u === n - 1) return d;

        for (let e = head[u]; e != -1; e = nxt[e]) {
            const v = to[e];
            const nr = (labels.charCodeAt(v) === labels.charCodeAt(u)) ? (r + 1) : 1;
            if (nr > k) continue;

            const nd = d + wt[e];
            const ns = v * (k + 1) + nr;
            if (nd < dist[ns]) {
                dist[ns] = nd;
                pq.push(nd, ns);
            }
        }
    }

    return -1;
};
