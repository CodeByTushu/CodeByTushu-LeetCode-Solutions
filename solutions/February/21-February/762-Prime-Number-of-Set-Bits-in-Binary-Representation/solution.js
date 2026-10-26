/**
 * Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function(left, right) {
    const primeMask = 665772;
    let count = 0;

    for (let i = left; i <= right; i++) {
        let n = i;
        let setBits = 0;
        while (n > 0) {
            n &= (n - 1);
            setBits++;
        }

        if ((primeMask >> setBits) & 1) {
            count++;
        }
    }

    return count;
};
