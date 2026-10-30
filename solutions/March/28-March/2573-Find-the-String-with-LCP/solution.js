/**
 * Problem: 2573. Find the String with LCP
 * Difficulty: Hard
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Greedily assign letters 'a' to 'z' to unassigned positions based on lcp[i][j] > 0.
 * Verify using DP recurrence lcp[i][j] === (word[i] === word[j] ? 1 + lcp[i+1][j+1] : 0).
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(n) auxiliary space
 * 
 * @param {number[][]} lcp
 * @return {string}
 */
var findTheString = function(lcp) {
    const n = lcp.length;
    const word = new Array(n).fill(null);
    let curCode = 97; // 'a'

    for (let i = 0; i < n; i++) {
        if (word[i] === null) {
            if (curCode > 122) { // 'z'
                return "";
            }
            const ch = String.fromCharCode(curCode++);
            for (let j = i; j < n; j++) {
                if (lcp[i][j] > 0) {
                    word[j] = ch;
                }
            }
        }
    }

    // Validation via DP in reverse
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const expected = (word[i] === word[j])
                ? (1 + (i + 1 < n && j + 1 < n ? lcp[i + 1][j + 1] : 0))
                : 0;
            if (lcp[i][j] !== expected) {
                return "";
            }
        }
    }

    return word.join("");
};
