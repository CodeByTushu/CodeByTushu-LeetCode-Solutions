/**
 * @param {string} s
 * @return {string}
 */
var smallestPalindrome = function(s) {
    const freq = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - 97]++;
    }

    const left = [];
    let middle = "";

    for (let i = 0; i < 26; i++) {
        while (freq[i] >= 2) {
            left.push(String.fromCharCode(97 + i));
            freq[i] -= 2;
        }
        if (freq[i] === 1) {
            middle = String.fromCharCode(97 + i);
        }
    }

    const leftStr = left.join('');
    const rightStr = left.slice().reverse().join('');
    return leftStr + middle + rightStr;
};
