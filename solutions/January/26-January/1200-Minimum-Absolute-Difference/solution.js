/**
 * Problem: LeetCode 1200 - Minimum Absolute Difference
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Sorting + Linear Scan Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (excluding output list, O(log n) for sorting)
 */

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function(arr) {
    arr.sort((a, b) => a - b);

    let minDiff = Infinity;
    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];
        if (diff < minDiff) {
            minDiff = diff;
        }
    }

    const result = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === minDiff) {
            result.push([arr[i - 1], arr[i]]);
        }
    }

    return result;
};
