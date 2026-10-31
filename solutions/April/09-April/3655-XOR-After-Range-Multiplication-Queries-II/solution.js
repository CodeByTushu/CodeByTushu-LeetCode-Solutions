/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007n;
    const n = nums.length;
    const B = Math.max(1, Math.floor(Math.sqrt(n)));

    const power = (base, exp) => {
        let res = 1n;
        let b = BigInt(base) % MOD;
        let e = BigInt(exp);
        while (e > 0n) {
            if (e & 1n) res = (res * b) % MOD;
            b = (b * b) % MOD;
            e >>= 1n;
        }
        return res;
    };

    const modInverse = (base) => power(base, MOD - 2n);

    const smallK = new Map();

    for (let i = 0; i < queries.length; i++) {
        const [l, r, k, v] = queries[i];
        if (k >= B) {
            const vBig = BigInt(v);
            for (let idx = l; idx <= r; idx += k) {
                nums[idx] = Number((BigInt(nums[idx]) * vBig) % MOD);
            }
        } else {
            if (!smallK.has(k)) smallK.set(k, []);
            smallK.get(k).push([l, r, v]);
        }
    }

    for (const [k, qList] of smallK.entries()) {
        const diff = new BigInt64Array(n + k);
        diff.fill(1n);

        for (let i = 0; i < qList.length; i++) {
            const [l, r, v] = qList[i];
            const vBig = BigInt(v);
            diff[l] = (diff[l] * vBig) % MOD;
            const steps = Math.floor((r - l) / k);
            const next = l + (steps + 1) * k;
            diff[next] = (diff[next] * modInverse(vBig)) % MOD;
        }

        for (let i = 0; i < n; i++) {
            if (i >= k) {
                diff[i] = (diff[i] * diff[i - k]) % MOD;
            }
            nums[i] = Number((BigInt(nums[i]) * diff[i]) % MOD);
        }
    }

    let xorSum = 0;
    for (let i = 0; i < n; i++) {
        xorSum ^= nums[i];
    }

    return xorSum;
};
