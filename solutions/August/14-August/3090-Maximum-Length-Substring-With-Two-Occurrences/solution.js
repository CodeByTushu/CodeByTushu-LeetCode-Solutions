/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function(s) {
    const n = s.length;
    const freq = new Int32Array(26);
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < n; right++) {
        const c = s.charCodeAt(right) - 97;
        freq[c]++;

        while (freq[c] > 2) {
            freq[s.charCodeAt(left) - 97]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
