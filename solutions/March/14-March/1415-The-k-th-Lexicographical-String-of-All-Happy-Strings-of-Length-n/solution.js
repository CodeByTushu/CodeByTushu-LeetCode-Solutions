/**
 * Problem: LeetCode 1415 - The k-th Lexicographical String of All Happy Strings of Length n
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function(n, k) {
    // Total happy strings of length n is 3 * 2^(n - 1)
    const total = 3 * (1 << (n - 1));
    if (k > total) {
        return "";
    }

    // Convert to 0-indexed
    k--;

    const res = [];
    const chars = ['a', 'b', 'c'];

    // Determine the first character
    let blockSize = 1 << (n - 1);
    let idx = Math.floor(k / blockSize);
    res.push(chars[idx]);
    k %= blockSize;

    // Determine each subsequent character
    for (let step = n - 2; step >= 0; step--) {
        blockSize = 1 << step;
        idx = Math.floor(k / blockSize);
        const prev = res[res.length - 1];
        const available = chars.filter(c => c !== prev);
        res.push(available[idx]);
        k %= blockSize;
    }

    return res.join("");
};
