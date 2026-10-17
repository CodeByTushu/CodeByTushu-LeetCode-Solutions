/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    const n = nums.length;
    const count = new Int32Array(51);

    for (let start = 0; start <= n - k; start++) {
        const seen = new Uint8Array(51);
        for (let i = start; i < start + k; i++) {
            seen[nums[i]] = 1;
        }
        for (let v = 0; v <= 50; v++) {
            if (seen[v] === 1) {
                count[v]++;
            }
        }
    }

    let ans = -1;
    for (let v = 0; v <= 50; v++) {
        if (count[v] === 1) {
            ans = v;
        }
    }

    return ans;
};
