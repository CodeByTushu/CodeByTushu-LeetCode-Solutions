/**
 * Problem: LeetCode 3507 - Minimum Pair Removal to Sort Array I
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Simulation Approach (Greedy Adjacent Pair Collapse)
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumPairRemoval = function(nums) {
    const arr = [...nums];
    let ops = 0;

    const isNonDecreasing = (a) => {
        for (let i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) return false;
        }
        return true;
    };

    while (!isNonDecreasing(arr)) {
        let minSum = Infinity;
        let minIdx = -1;

        // Find leftmost adjacent pair with minimum sum
        for (let i = 0; i < arr.length - 1; i++) {
            const sum = arr[i] + arr[i + 1];
            if (sum < minSum) {
                minSum = sum;
                minIdx = i;
            }
        }

        // Replace pair with sum
        arr.splice(minIdx, 2, minSum);
        ops++;
    }

    return ops;
};
