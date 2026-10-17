/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var shortestBeautifulSubstring = function(s, k) {
    const n = s.length;
    let result = "";
    let minLen = Infinity;

    let left = 0, ones = 0;
    for (let right = 0; right < n; right++) {
        if (s[right] === '1') {
            ones++;
        }

        // shrink from left while window has more than k ones,
        // or while shrinking still keeps exactly k ones
        while (ones > k || (left <= right && s[left] === '0' && ones === k)) {
            if (s[left] === '1') {
                ones--;
            }
            left++;
        }

        if (ones === k) {
            const len = right - left + 1;
            const candidate = s.substring(left, right + 1);
            if (len < minLen || (len === minLen && candidate < result)) {
                minLen = len;
                result = candidate;
            }
        }
    }

    return result;
};
