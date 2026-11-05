/**
 * Problem: LeetCode 1385 - Find the Distance Value Between Two Arrays
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function(arr1, arr2, d) {
    let count = 0;

    for (const a of arr1) {
        let ok = true;
        for (const b of arr2) {
            if (Math.abs(a - b) <= d) {
                ok = false;
                break;
            }
        }
        if (ok) count++;
    }

    return count;
};
