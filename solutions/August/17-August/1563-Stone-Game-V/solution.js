/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function(stoneValue) {
    const n = stoneValue.length;
    const prefixSum = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
    }

    const memo = Array.from({ length: n }, () => new Int32Array(n).fill(-1));

    function solve(l, r) {
        if (l === r) return 0;
        if (memo[l][r] !== -1) return memo[l][r];

        let best = 0;
        for (let m = l; m < r; m++) {
            const leftSum = prefixSum[m + 1] - prefixSum[l];
            const rightSum = prefixSum[r + 1] - prefixSum[m + 1];

            let score;
            if (leftSum < rightSum) {
                score = leftSum + solve(l, m);
            } else if (leftSum > rightSum) {
                score = rightSum + solve(m + 1, r);
            } else {
                score = leftSum + Math.max(solve(l, m), solve(m + 1, r));
            }

            if (score > best) {
                best = score;
            }
        }

        memo[l][r] = best;
        return best;
    }

    return solve(0, n - 1);
};
