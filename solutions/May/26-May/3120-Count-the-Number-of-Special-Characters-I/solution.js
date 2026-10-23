/**
 * Problem: LeetCode 3120 - Count the Number of Special Characters I
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    let lowerMask = 0;
    let upperMask = 0;

    for (let i = 0; i < word.length; i++) {
        const code = word.charCodeAt(i);
        if (code >= 97 && code <= 122) { // 'a' - 'z'
            lowerMask |= (1 << (code - 97));
        } else if (code >= 65 && code <= 90) { // 'A' - 'Z'
            upperMask |= (1 << (code - 65));
        }
    }

    let common = lowerMask & upperMask;
    let count = 0;
    while (common > 0) {
        common &= (common - 1);
        count++;
    }
    return count;
};
