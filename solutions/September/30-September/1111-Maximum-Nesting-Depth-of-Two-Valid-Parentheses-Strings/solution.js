/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function(seq) {
    const n = seq.length;
    const ans = new Array(n);
    let depth = 0;

    for (let i = 0; i < n; i++) {
        if (seq[i] === '(') {
            depth++;
            ans[i] = depth % 2;
        } else {
            ans[i] = depth % 2;
            depth--;
        }
    }

    return ans;
};
