/**
 * Problem: LeetCode 3121 - Count the Number of Special Characters II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    const lastLower = new Int32Array(26).fill(-1);
    const firstUpper = new Int32Array(26).fill(-1);

    const n = word.length;
    for (let i = 0; i < n; i++) {
        const code = word.charCodeAt(i);
        if (code >= 97 && code <= 122) { // 'a' - 'z'
            lastLower[code - 97] = i;
        } else if (code >= 65 && code <= 90) { // 'A' - 'Z'
            const idx = code - 65;
            if (firstUpper[idx] === -1) {
                firstUpper[idx] = i;
            }
        }
    }

    let specialCount = 0;
    for (let i = 0; i < 26; i++) {
        if (lastLower[i] !== -1 && firstUpper[i] !== -1 && lastLower[i] < firstUpper[i]) {
            specialCount++;
        }
    }

    return specialCount;
};
