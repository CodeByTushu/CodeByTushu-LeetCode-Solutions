/**
 * Problem: LeetCode 3013 - Divide an Array Into Subarrays With Minimum Cost II
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} dist
 * @return {number}
 */
var minimumCost = function(nums, k, dist) {
    const n = nums.length;
    const m = k - 1;

    // Coordinate compression over nums[1 ... n - 1]
    const vals = Array.from(new Set(nums.slice(1))).sort((a, b) => a - b);
    const U = vals.length;

    function getRank(x) {
        let l = 0, r = U - 1;
        while (l <= r) {
            const mid = (l + r) >> 1;
            if (vals[mid] === x) return mid + 1;
            if (vals[mid] < x) l = mid + 1;
            else r = mid - 1;
        }
        return l + 1;
    }

    const bitCount = new Int32Array(U + 1);
    const bitSum = new Float64Array(U + 1);

    function update(rank, val, delta) {
        for (let i = rank; i <= U; i += i & -i) {
            bitCount[i] += delta;
            bitSum[i] += delta * val;
        }
    }

    function querySumOfSmallest(count) {
        let idx = 0;
        let currentCount = 0;
        let step = 1;
        while ((step << 1) <= U) step <<= 1;

        for (; step > 0; step >>= 1) {
            if (idx + step <= U && currentCount + bitCount[idx + step] < count) {
                idx += step;
                currentCount += bitCount[idx];
            }
        }

        let sum = 0;
        for (let i = idx; i > 0; i -= i & -i) {
            sum += bitSum[i];
        }

        const rem = count - currentCount;
        if (rem > 0 && idx < U) {
            sum += rem * vals[idx];
        }
        return sum;
    }

    // Initialize first window of size dist + 1: indices 1 to min(n - 1, 1 + dist)
    for (let i = 1; i <= Math.min(n - 1, 1 + dist); i++) {
        update(getRank(nums[i]), nums[i], 1);
    }

    let minSum = querySumOfSmallest(m);

    // Slide window across nums[1 ... n - 1]
    for (let i = 2 + dist; i < n; i++) {
        update(getRank(nums[i]), nums[i], 1);
        update(getRank(nums[i - dist - 1]), nums[i - dist - 1], -1);
        const cur = querySumOfSmallest(m);
        if (cur < minSum) minSum = cur;
    }

    return nums[0] + minSum;
};
