/**
 * Problem: LeetCode 2243 - Calculate Digit Sum of a String
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var digitSum = function(s, k) {
    while (s.length > k) {
        let next = "";

        for (let i = 0; i < s.length; i += k) {
            let sum = 0;
            const end = Math.min(i + k, s.length);

            for (let j = i; j < end; j++) {
                sum += Number(s[j]);
            }

            next += sum;
        }

        s = next;
    }

    return s;
};
