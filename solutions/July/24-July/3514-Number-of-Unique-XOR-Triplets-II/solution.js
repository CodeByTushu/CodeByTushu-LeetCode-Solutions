/**
 * Problem: LeetCode 3514 - Number of Unique XOR Triplets II
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function(nums) {
    const MAX = 2048;
    let dp = Array.from({ length: 4 }, () => new Uint8Array(MAX));
    dp[0][0] = 1;

    for (const x of nums) {
        const next = Array.from({ length: 4 }, (v, i) => new Uint8Array(dp[i]));

        // Use current element up to 3 times (i <= j <= k allows repeats)
        for (let t = 0; t < 3; t++) {
            for (let k = 2; k >= 0; k--) {
                for (let v = 0; v < MAX; v++) {
                    if (next[k][v]) {
                        next[k + 1][v ^ x] = 1;
                    }
                }
            }
        }

        dp = next;
    }

    let ans = 0;
    for (let v = 0; v < MAX; v++) {
        if (dp[3][v]) ans++;
    }
    return ans;
};
