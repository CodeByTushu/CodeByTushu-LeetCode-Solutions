/**
 * Problem: LeetCode 3886 - Sum of Sortable Integers
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var sortableIntegers = function(nums) {
    const n = nums.length;
    let ans = 0;

    function isSortable(k) {
        let prevMax = 0;
        for (let start = 0; start < n; start += k) {
            let mn = Infinity;
            let mx = -Infinity;
            let desc = 0;
            const end = start + k;

            for (let i = start; i < end; i++) {
                if (nums[i] < mn) mn = nums[i];
                if (nums[i] > mx) mx = nums[i];
                const next = (i + 1 < end) ? i + 1 : start;
                if (nums[i] > nums[next]) {
                    desc++;
                }
            }

            if (desc > 1) return false;
            if (mn < prevMax) return false;

            prevMax = mx;
        }
        return true;
    }

    for (let k = 1; k <= n; k++) {
        if (n % k !== 0) continue;
        if (isSortable(k)) {
            ans += k;
        }
    }

    return ans;
};
