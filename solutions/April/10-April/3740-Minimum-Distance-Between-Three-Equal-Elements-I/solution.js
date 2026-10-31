/**
 * Problem: LeetCode 3740 - Minimum Distance Between Three Equal Elements I
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function(nums) {
    const map = new Map();
    let minDistance = Infinity;

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (!map.has(val)) {
            map.set(val, []);
        }
        const list = map.get(val);
        list.push(i);

        const len = list.length;
        if (len >= 3) {
            const first = list[len - 3];
            const third = list[len - 1];
            minDistance = Math.min(minDistance, 2 * (third - first));
        }
    }

    return minDistance === Infinity ? -1 : minDistance;
};
