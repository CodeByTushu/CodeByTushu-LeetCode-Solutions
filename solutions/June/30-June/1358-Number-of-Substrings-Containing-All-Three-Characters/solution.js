/**
 * Problem: LeetCode 1358 - Number of Substrings Containing All Three Characters
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    const count = [0, 0, 0];
    let left = 0;
    let ans = 0;
    const n = s.length;

    for (let right = 0; right < n; right++) {
        count[s.charCodeAt(right) - 97]++;

        while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
            ans += n - right;
            count[s.charCodeAt(left) - 97]--;
            left++;
        }
    }

    return ans;
};
