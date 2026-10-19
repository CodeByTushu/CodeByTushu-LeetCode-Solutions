/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function(n, l, r) {
    const MOD = 1000000007;
    const m = r - l + 1;

    let up = new Float64Array(m);
    let down = new Float64Array(m);
    up.fill(1);
    down.fill(1);

    for (let len = 2; len <= n; len++) {
        const newUp = new Float64Array(m);
        const newDown = new Float64Array(m);

        let prefix = 0;
        for (let i = 0; i < m; i++) {
            newUp[i] = prefix;
            prefix = (prefix + down[i]) % MOD;
        }

        let suffix = 0;
        for (let i = m - 1; i >= 0; i--) {
            newDown[i] = suffix;
            suffix = (suffix + up[i]) % MOD;
        }

        up = newUp;
        down = newDown;
    }

    let ans = 0;
    for (let i = 0; i < m; i++) {
        ans = (ans + up[i] + down[i]) % MOD;
    }

    return ans;
};
