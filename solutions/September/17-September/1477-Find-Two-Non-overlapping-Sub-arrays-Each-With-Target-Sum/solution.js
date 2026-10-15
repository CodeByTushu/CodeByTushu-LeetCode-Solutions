/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function(arr, target) {
    const n = arr.length;
    const best = new Array(n).fill(Infinity);
    const map = new Map();
    map.set(0, -1);
    let sum = 0;
    let ans = Infinity;
    let curBest = Infinity;
    
    for (let i = 0; i < n; i++) {
        sum += arr[i];
        if (map.has(sum - target)) {
            const j = map.get(sum - target);
            const len = i - j;
            if (j >= 0 && best[j] !== Infinity) {
                ans = Math.min(ans, len + best[j]);
            }
            curBest = Math.min(curBest, len);
        }
        best[i] = curBest;
        map.set(sum, i);
    }
    
    return ans === Infinity ? -1 : ans;
};
