/**
 * Problem: LeetCode 2657 - Find the Prefix Common Array of Two Arrays
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var findThePrefixCommonArray = function(A, B) {
    const n = A.length;
    const C = new Array(n);
    const freq = new Uint8Array(n + 1);
    let commonCount = 0;

    for (let i = 0; i < n; i++) {
        if (++freq[A[i]] === 2) {
            commonCount++;
        }
        if (++freq[B[i]] === 2) {
            commonCount++;
        }
        C[i] = commonCount;
    }

    return C;
};
