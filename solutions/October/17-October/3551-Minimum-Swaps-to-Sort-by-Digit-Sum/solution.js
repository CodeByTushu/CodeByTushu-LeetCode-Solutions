/**
 * Problem: LeetCode 3551 - Minimum Swaps to Sort by Digit Sum
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function(nums) {
    const n = nums.length;
    const ds = new Int32Array(n);

    for (let i = 0; i < n; i++) {
        let x = nums[i], s = 0;
        while (x > 0) {
            s += x % 10;
            x = Math.floor(x / 10);
        }
        ds[i] = s;
    }

    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) idx[i] = i;

    idx.sort((a, b) => {
        if (ds[a] !== ds[b]) return ds[a] - ds[b];
        return nums[a] - nums[b];
    });

    const visited = new Uint8Array(n);
    let swaps = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i] || idx[i] === i) continue;
        let cycleLen = 0;
        let j = i;
        while (!visited[j]) {
            visited[j] = 1;
            j = idx[j];
            cycleLen++;
        }
        swaps += cycleLen - 1;
    }

    return swaps;
};
