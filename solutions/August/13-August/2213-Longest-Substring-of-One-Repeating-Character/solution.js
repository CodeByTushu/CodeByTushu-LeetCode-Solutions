/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function(s, queryCharacters, queryIndices) {
    const n = s.length;
    const leftCh = new Array(4 * n);
    const rightCh = new Array(4 * n);
    const pre = new Int32Array(4 * n);
    const suf = new Int32Array(4 * n);
    const best = new Int32Array(4 * n);

    function pull(node, l, mid, r) {
        const leftNode = 2 * node;
        const rightNode = 2 * node + 1;
        const leftLen = mid - l + 1;
        const rightLen = r - mid;

        leftCh[node] = leftCh[leftNode];
        rightCh[node] = rightCh[rightNode];

        pre[node] = pre[leftNode];
        if (pre[leftNode] === leftLen && rightCh[leftNode] === leftCh[rightNode]) {
            pre[node] += pre[rightNode];
        }

        suf[node] = suf[rightNode];
        if (suf[rightNode] === rightLen && rightCh[leftNode] === leftCh[rightNode]) {
            suf[node] += suf[leftNode];
        }

        best[node] = Math.max(best[leftNode], best[rightNode]);
        if (rightCh[leftNode] === leftCh[rightNode]) {
            best[node] = Math.max(best[node], suf[leftNode] + pre[rightNode]);
        }
    }

    function build(node, l, r) {
        if (l === r) {
            leftCh[node] = rightCh[node] = s[l];
            pre[node] = suf[node] = best[node] = 1;
            return;
        }
        const mid = (l + r) >> 1;
        build(2 * node, l, mid);
        build(2 * node + 1, mid + 1, r);
        pull(node, l, mid, r);
    }

    function update(node, l, r, idx, c) {
        if (l === r) {
            leftCh[node] = rightCh[node] = c;
            pre[node] = suf[node] = best[node] = 1;
            return;
        }
        const mid = (l + r) >> 1;
        if (idx <= mid) {
            update(2 * node, l, mid, idx, c);
        } else {
            update(2 * node + 1, mid + 1, r, idx, c);
        }
        pull(node, l, mid, r);
    }

    build(1, 0, n - 1);

    const k = queryCharacters.length;
    const ans = new Array(k);
    for (let i = 0; i < k; i++) {
        update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
        ans[i] = best[1];
    }

    return ans;
};
