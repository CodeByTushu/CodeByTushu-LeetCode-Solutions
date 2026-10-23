/**
 * Problem: LeetCode 3761 - Minimum Absolute Distance Between Mirror Pairs
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMirrorPairDistance = function(nums) {
    const reverseNum = (x) => {
        let rev = 0;
        while (x > 0) {
            rev = rev * 10 + (x % 10);
            x = Math.floor(x / 10);
        }
        return rev > 1000000000 ? -1 : rev;
    };

    const lastSeen = new Map();
    let minDistance = Infinity;

    for (let j = 0; j < nums.length; ++j) {
        const val = nums[j];

        // Check if nums[j] matches reverse(nums[i]) from an earlier index i
        if (lastSeen.has(val)) {
            const dist = j - lastSeen.get(val);
            if (dist < minDistance) {
                minDistance = dist;
                if (minDistance === 1) return 1;
            }
        }

        // Record reverse(nums[j]) with its current index j
        const rev = reverseNum(val);
        if (rev !== -1) {
            lastSeen.set(rev, j);
        }
    }

    return minDistance === Infinity ? -1 : minDistance;
};
