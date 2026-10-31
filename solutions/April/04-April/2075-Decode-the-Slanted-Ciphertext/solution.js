/**
 * Problem: LeetCode 2075 - Decode the Slanted Ciphertext
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var decodeCiphertext = function(encodedText, rows) {
    if (rows === 1 || !encodedText) {
        return encodedText;
    }

    const n = encodedText.length;
    const cols = Math.floor(n / rows);
    const res = [];

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows && c + r < cols; r++) {
            res.push(encodedText[r * cols + (c + r)]);
        }
    }

    while (res.length > 0 && res[res.length - 1] === ' ') {
        res.pop();
    }

    return res.join('');
};
