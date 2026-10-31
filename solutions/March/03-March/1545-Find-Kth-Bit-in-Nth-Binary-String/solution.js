/**
 * Problem: LeetCode 1545 - Find Kth Bit in Nth Binary String
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
var findKthBit = function(n, k) {
    let invertCount = 0;

    while (n > 1) {
        const mid = 1 << (n - 1);

        if (k === mid) {
            return (invertCount % 2 === 0) ? '1' : '0';
        } else if (k > mid) {
            k = (1 << n) - k;
            invertCount++;
        }

        n--;
    }

    return (invertCount % 2 === 0) ? '0' : '1';
};
