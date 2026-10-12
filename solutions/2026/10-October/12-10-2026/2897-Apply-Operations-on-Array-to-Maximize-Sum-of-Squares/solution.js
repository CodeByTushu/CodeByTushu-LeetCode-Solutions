/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSum = function(nums, k) {
    const MOD = 1000000007n;
    const cnt = new Int32Array(30);

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        for (let b = 0; b < 30; b++) {
            if ((num >> b) & 1) {
                cnt[b]++;
            }
        }
    }

    let ans = 0n;
    for (let i = 0; i < k; i++) {
        let cur = 0n;
        for (let b = 0; b < 30; b++) {
            if (cnt[b] > 0) {
                cur |= (1n << BigInt(b));
                cnt[b]--;
            }
        }
        ans = (ans + cur * cur) % MOD;
    }

    return Number(ans);
};
