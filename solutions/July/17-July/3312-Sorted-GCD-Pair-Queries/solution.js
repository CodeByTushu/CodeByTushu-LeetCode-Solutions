/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var gcdValues = function(nums, queries) {
    let maxVal = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }

    const freq = new Int32Array(maxVal + 1);
    for (let i = 0; i < nums.length; i++) {
        freq[nums[i]]++;
    }

    const cnt = new Float64Array(maxVal + 1);
    for (let g = 1; g <= maxVal; g++) {
        let c = 0;
        for (let j = g; j <= maxVal; j += g) {
            c += freq[j];
        }
        cnt[g] = (c * (c - 1)) / 2;
    }

    const exact = new Float64Array(cnt);
    for (let g = maxVal; g >= 1; g--) {
        for (let j = g * 2; j <= maxVal; j += g) {
            exact[g] -= exact[j];
        }
    }

    const prefix = new Float64Array(maxVal + 1);
    for (let g = 1; g <= maxVal; g++) {
        prefix[g] = prefix[g - 1] + exact[g];
    }

    const m = queries.length;
    const ans = new Int32Array(m);
    for (let i = 0; i < m; i++) {
        const k = Number(queries[i]) + 1;
        let l = 1, r = maxVal;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (prefix[mid] >= k) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        ans[i] = l;
    }

    return Array.from(ans);
};
