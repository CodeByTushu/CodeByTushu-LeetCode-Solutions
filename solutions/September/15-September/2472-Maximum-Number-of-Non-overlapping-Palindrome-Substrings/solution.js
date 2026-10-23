/**
 * Problem: LeetCode 2472 - Maximum Number of Non-overlapping Palindrome Substrings
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPalindromes = function(s, k) {
    const n = s.length;
    const isPalin = Array.from({ length: n }, () => new Uint8Array(n));
    
    for (let i = 0; i < n; i++) isPalin[i][i] = 1;
    for (let i = 0; i < n - 1; i++) {
        isPalin[i][i + 1] = (s[i] === s[i + 1]) ? 1 : 0;
    }
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            isPalin[i][j] = (s[i] === s[j] && isPalin[i + 1][j - 1]) ? 1 : 0;
        }
    }
    
    let count = 0;
    let i = 0;
    while (i <= n - k) {
        let found = false;
        for (let len = k; len <= k + 1 && i + len - 1 < n; len++) {
            const j = i + len - 1;
            if (isPalin[i][j]) {
                count++;
                i = j + 1;
                found = true;
                break;
            }
        }
        if (!found) i++;
    }
    return count;
};
