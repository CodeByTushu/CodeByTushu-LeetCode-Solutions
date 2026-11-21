/**
 * Problem: LeetCode 3331 - Find Subtree Sizes After Changes
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function(parent, s) {
    const n = parent.length;
    const head = new Int32Array(n).fill(-1);
    const nxt = new Int32Array(n).fill(-1);

    for (let i = 1; i < n; i++) {
        nxt[i] = head[parent[i]];
        head[parent[i]] = i;
    }

    const last = new Int32Array(26).fill(-1);
    const newPar = new Int32Array(parent);
    const saved = new Int32Array(n).fill(-1);
    const order = new Int32Array(n);
    let cnt = 0;

    const it = new Int32Array(head);
    const stack = new Int32Array(n);
    let sp = 0;

    const c0 = s.charCodeAt(0) - 97;
    saved[0] = last[c0];
    last[c0] = 0;
    order[cnt++] = 0;
    stack[sp++] = 0;

    while (sp > 0) {
        const x = stack[sp - 1];
        if (it[x] !== -1) {
            const child = it[x];
            it[x] = nxt[child];

            const c = s.charCodeAt(child) - 97;
            saved[child] = last[c];
            if (last[c] !== -1) newPar[child] = last[c];

            last[c] = child;
            order[cnt++] = child;
            stack[sp++] = child;
        } else {
            sp--;
            last[s.charCodeAt(x) - 97] = saved[x];
        }
    }

    const size = new Int32Array(n).fill(1);
    for (let i = n - 1; i >= 1; i--) {
        const x = order[i];
        size[newPar[x]] += size[x];
    }

    return Array.from(size);
};
