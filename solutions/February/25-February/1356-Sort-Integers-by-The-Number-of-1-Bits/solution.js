/**
 * Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function(arr) {
    function countBits(n) {
        let count = 0;
        while (n > 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }

    return arr.sort((a, b) => {
        const bitsA = countBits(a);
        const bitsB = countBits(b);
        if (bitsA !== bitsB) {
            return bitsA - bitsB;
        }
        return a - b;
    });
};
