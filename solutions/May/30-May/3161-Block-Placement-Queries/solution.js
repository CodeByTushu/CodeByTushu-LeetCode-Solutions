/**
 * Problem: LeetCode 3161 - Block Placement Queries
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var getResults = function(queries) {
    let maxCoord = 0;
    for (let i = 0; i < queries.length; i++) {
        if (queries[i][1] > maxCoord) {
            maxCoord = queries[i][1];
        }
    }
    const M = maxCoord + 1;
    const treeMax = new Int32Array(4 * M);
    const treeHas = new Uint8Array(4 * M);

    function update(node, l, r, idx, val, has) {
        if (l === r) {
            treeMax[node] = val;
            treeHas[node] = has;
            return;
        }
        const mid = (l + r) >> 1;
        if (idx <= mid) {
            update(node << 1, l, mid, idx, val, has);
        } else {
            update((node << 1) | 1, mid + 1, r, idx, val, has);
        }
        treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        treeHas[node] = treeHas[node << 1] | treeHas[(node << 1) | 1];
    }

    function queryMax(node, l, r, ql, qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return treeMax[node];
        const mid = (l + r) >> 1;
        return Math.max(queryMax(node << 1, l, mid, ql, qr), queryMax((node << 1) | 1, mid + 1, r, ql, qr));
    }

    function findPrev(node, l, r, ql, qr) {
        if (ql > r || qr < l || !treeHas[node]) return -1;
        if (l === r) return l;
        const mid = (l + r) >> 1;
        const res = findPrev((node << 1) | 1, mid + 1, r, ql, qr);
        if (res !== -1) return res;
        return findPrev(node << 1, l, mid, ql, qr);
    }

    function findNext(node, l, r, ql, qr) {
        if (ql > r || qr < l || !treeHas[node]) return -1;
        if (l === r) return l;
        const mid = (l + r) >> 1;
        const res = findNext(node << 1, l, mid, ql, qr);
        if (res !== -1) return res;
        return findNext((node << 1) | 1, mid + 1, r, ql, qr);
    }

    // Origin 0 is an obstacle
    update(1, 0, M - 1, 0, 0, 1);

    const ans = [];
    for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        if (q[0] === 1) {
            const x = q[1];
            const prev = findPrev(1, 0, M - 1, 0, x - 1);
            const next = findNext(1, 0, M - 1, x + 1, M - 1);
            update(1, 0, M - 1, x, x - prev, 1);
            if (next !== -1) {
                update(1, 0, M - 1, next, next - x, 1);
            }
        } else {
            const x = q[1];
            const sz = q[2];
            const prev = findPrev(1, 0, M - 1, 0, x);
            const maxBefore = queryMax(1, 0, M - 1, 0, x);
            const maxGap = Math.max(maxBefore, x - prev);
            ans.push(maxGap >= sz);
        }
    }

    return ans;
};
